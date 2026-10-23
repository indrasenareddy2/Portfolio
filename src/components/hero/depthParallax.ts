/**
 * Minimal WebGL "3D photo": shifts each pixel of the hero render by its depth so the avatar,
 * desk and room move at different rates. One full-screen quad, two textures, no libraries.
 */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vUv.y = 1.0 - vUv.y;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D uImage;
uniform sampler2D uDepth;
uniform vec2 uOffset;
uniform float uZoom;
varying vec2 vUv;
void main() {
  vec2 uv = (vUv - 0.5) / uZoom + 0.5;
  // A few fixed-point steps approximate parallax occlusion: look up depth where we land.
  vec2 p = uv;
  for (int i = 0; i < 3; i++) {
    float d = texture2D(uDepth, p).r;
    p = uv + uOffset * (d - 0.32);
  }
  gl_FragColor = texture2D(uImage, clamp(p, 0.001, 0.999));
}`;

export interface DepthRenderer {
  render(offsetX: number, offsetY: number, zoom: number): void;
  resize(width: number, height: number, dpr: number): void;
  dispose(): void;
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}

function texture(gl: WebGLRenderingContext, unit: number, img: TexImageSource) {
  const t = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  return t;
}

export function createDepthRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement, depth: HTMLImageElement): DepthRenderer | null {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, premultipliedAlpha: false, powerPreference: "low-power" });
  if (!gl) return null;

  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const texImage = texture(gl, 0, image);
  const texDepth = texture(gl, 1, depth);
  gl.uniform1i(gl.getUniformLocation(program, "uImage"), 0);
  gl.uniform1i(gl.getUniformLocation(program, "uDepth"), 1);
  const uOffset = gl.getUniformLocation(program, "uOffset");
  const uZoom = gl.getUniformLocation(program, "uZoom");

  return {
    render(x, y, zoom) {
      gl.uniform2f(uOffset, x, y);
      gl.uniform1f(uZoom, zoom);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    resize(width, height, dpr) {
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    dispose() {
      gl.deleteTexture(texImage);
      gl.deleteTexture(texDepth);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
