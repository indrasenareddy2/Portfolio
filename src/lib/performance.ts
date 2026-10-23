export type DeviceTier = "high" | "mid" | "low";

interface NavigatorHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
}

/** Coarse capability tiering used to size the hero scene. Runs on the client only. */
export function detectTier(): DeviceTier {
  const nav = navigator as NavigatorHints;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  const width = window.innerWidth;
  const saveData = nav.connection?.saveData ?? false;
  const slowNet = /(^|-)2g$/.test(nav.connection?.effectiveType ?? "");

  if (saveData || slowNet || cores <= 2 || memory <= 2) return "low";
  if (width < 768 || cores <= 4 || memory <= 4) return "mid";
  return "high";
}

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
