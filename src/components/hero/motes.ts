/** Integer arithmetic gives the server and browser exactly the same particle sequence. */
export function createMotes(count = 22) {
  let seed = 0x51a7;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  // Explicit units and bounded precision also survive CSS parsing/serialization unchanged.
  return Array.from({ length: count }, () => ({
    x: `${(4 + random() * 92).toFixed(2)}%`,
    y: `${(20 + random() * 75).toFixed(2)}%`,
    size: `${(2 + random() * 4).toFixed(2)}px`,
    duration: `${(9 + random() * 12).toFixed(2)}s`,
    delay: `${(-random() * 20).toFixed(2)}s`,
    near: random() > 0.6,
  }));
}
