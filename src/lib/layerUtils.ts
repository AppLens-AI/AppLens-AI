import { LayerConfig, CanvasConfig, GradientProperties, GradientStop } from "@/types";

// ── Gradient helpers ─────────────────────────────────────────────────────────

const DEFAULT_STOPS: [GradientStop, GradientStop] = [
  { color: "#667eea", position: 0 },
  { color: "#764ba2", position: 100 },
];

/** Normalise any gradient layer's color props into exactly 2 validated stops. */
export function resolveGradientColors(
  props: GradientProperties,
): [GradientStop, GradientStop] {
  const raw = Array.isArray(props.colors) ? props.colors.slice(0, 2) : [];
  return [
    raw[0] ?? DEFAULT_STOPS[0],
    raw[1] ?? DEFAULT_STOPS[1],
  ];
}

/** Safe angle – always a finite number, default 180. */
export function resolveGradientAngle(props: GradientProperties): number {
  const a = props.angle;
  return typeof a === "number" && isFinite(a) ? a : 180;
}

/** CSS background string used by the editor preview. */
export function gradientToCSS(props: GradientProperties): string {
  const colors = resolveGradientColors(props);
  const type = props.gradientType || "linear";
  const angle = resolveGradientAngle(props);

  const stops = colors
    .map((c) => `${c.color} ${Math.min(100, Math.max(0, c.position))}%`)
    .join(", ");

  return type === "radial"
    ? `radial-gradient(circle, ${stops})`
    : `linear-gradient(${angle}deg, ${stops})`;
}

/** Konva-native flat color-stop array: [offset, color, offset, color, …] */
export function gradientToKonvaStops(
  colors: [GradientStop, GradientStop],
): (string | number)[] {
  const out: (string | number)[] = [];
  for (const stop of colors) {
    const pos = Number(stop.position);
    const safe = isFinite(pos) ? Math.min(1, Math.max(0, pos / 100)) : 0;
    out.push(safe, stop.color || "#000000");
  }
  return out;
}

/**
 * Compute the start/end points for a Konva linear gradient that matches
 * the CSS `linear-gradient(Xdeg, …)` convention.
 */
export function gradientLinearPoints(
  angle: number,
  w: number,
  h: number,
): { start: { x: number; y: number }; end: { x: number; y: number } } {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    start: { x: w / 2 - (Math.cos(rad) * w) / 2, y: h / 2 - (Math.sin(rad) * h) / 2 },
    end:   { x: w / 2 + (Math.cos(rad) * w) / 2, y: h / 2 + (Math.sin(rad) * h) / 2 },
  };
}

// ── Existing code ────────────────────────────────────────────────────────────

export interface CanvasData {
  canvas: CanvasConfig;
  layers: LayerConfig[];
}

export interface TemplateSlideProps {
  canvas: CanvasConfig;
  layers: LayerConfig[];
  isActive: boolean;
  onClick: () => void;
}

type Position =
  | "center"
  | "top"
  | "bottom"
  | "top-overflow"
  | "bottom-overflow";
type AnchorX = "left" | "center" | "right";
type AnchorY = "top" | "center" | "bottom";

export interface LayoutConfig {
  position?: Position;
  anchorX?: AnchorX;
  anchorY?: AnchorY;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
}

/**
 * Recursively converts MongoDB BSON Key/Value serialisation back into plain JS
 * objects.  Handles both single-wrapped `[{Key, Value}, …]` and double-wrapped
 * `[[{Key:"Key",Value:k},{Key:"Value",Value:v}], …]` formats at any depth,
 * which is critical for nested structures like GradientProperties.colors.
 */
function deepNormalizeMongo(val: any): any {
  if (val == null || typeof val !== "object") return val;

  if (Array.isArray(val)) {
    // Detect BSON Document pattern: [{Key: …, Value: …}, …]
    if (
      val.length > 0 &&
      typeof val[0] === "object" &&
      val[0] !== null &&
      !Array.isArray(val[0]) &&
      "Key" in val[0] &&
      "Value" in val[0]
    ) {
      const obj: Record<string, any> = {};
      for (const item of val) {
        if (item?.Key !== undefined && item?.Value !== undefined) {
          obj[item.Key] = deepNormalizeMongo(item.Value);
        }
      }
      return obj;
    }

    // Regular array — recurse each element, then re-check the result because
    // the double-wrapped format `[[{Key:"Key",Value:k},{Key:"Value",Value:v}]]`
    // collapses into a single-wrapped KV doc after one recursion pass.
    const mapped = val.map((el: any) => deepNormalizeMongo(el));

    if (
      mapped.length > 0 &&
      typeof mapped[0] === "object" &&
      mapped[0] !== null &&
      !Array.isArray(mapped[0]) &&
      "Key" in mapped[0] &&
      "Value" in mapped[0]
    ) {
      const obj: Record<string, any> = {};
      for (const item of mapped) {
        if (item?.Key !== undefined && item?.Value !== undefined) {
          obj[item.Key] = deepNormalizeMongo(item.Value);
        }
      }
      return obj;
    }

    return mapped;
  }

  // Plain object — recurse into every value so nested BSON structures are
  // normalised even when the parent was already a normal JS object.
  const obj: Record<string, any> = {};
  for (const [k, v] of Object.entries(val)) {
    obj[k] = deepNormalizeMongo(v);
  }
  return obj;
}

export function normalizeLayerProperties<T = any>(properties: any): T {
  if (!properties || typeof properties !== "object") {
    return {} as T;
  }

  const result = deepNormalizeMongo(properties);

  // Ensure we always return a plain object, never an array
  return result && typeof result === "object" && !Array.isArray(result)
    ? (result as T)
    : ({} as T);
}

/**
 * Normalizes a layer's properties from MongoDB format
 * This should be called when loading layers from the backend
 */
export function normalizeLayer(layer: LayerConfig): LayerConfig {
  return {
    ...layer,
    properties: normalizeLayerProperties(layer.properties),
  };
}

/**
 * Normalizes all layers in an array
 */
export function normalizeLayers(layers: LayerConfig[]): LayerConfig[] {
  return layers.map(normalizeLayer);
}

export function calculateLayerStyle(
  layer: LayerConfig,
  canvas: { width: number; height: number },
  layoutConfig: LayoutConfig,
): React.CSSProperties {
  const {
    position = "center",
    anchorX = "center",
    anchorY = "center",
    offsetX = 0,
    offsetY = 0,
    scale = 1,
  } = layoutConfig;

  const isFullBackground =
    (layer.type === "gradient") ||
    (layer.type === "shape" &&
    layer.x === 0 &&
    layer.y === 0 &&
    layer.width === canvas.width &&
    layer.height === canvas.height);

  if (isFullBackground) {
    return {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      opacity: layer.opacity,
      zIndex: layer.zIndex,
    };
  }

  const widthPercent = (layer.width / canvas.width) * 100 * scale;
  const heightPercent = (layer.height / canvas.height) * 100 * scale;

  let left: string;
  let translateX: string;

  const offsetXPercent = (offsetX / canvas.width) * 100;

  switch (anchorX) {
    case "left":
      left = `${offsetXPercent}%`;
      translateX = "0";
      break;
    case "right":
      left = `${100 - offsetXPercent}%`;
      translateX = "-100%";
      break;
    case "center":
    default:
      // Center at 50% and shift by offsetX so drag updates reflect on canvas
      left = `${50 + offsetXPercent}%`;
      translateX = "-50%";
      break;
  }

  let top: string;
  let translateY: string;

  switch (position) {
    case "top":
      top = `${(offsetY / canvas.height) * 100}%`;
      translateY =
        anchorY === "center" ? "-50%" : anchorY === "bottom" ? "-100%" : "0";
      break;
    case "bottom":
      top = `${100 - (offsetY / canvas.height) * 100}%`;
      translateY = "-100%";
      break;
    case "top-overflow":
      top = `${(offsetY / canvas.height) * 100}%`;
      translateY = anchorY === "bottom" ? "-100%" : "0";
      break;
    case "bottom-overflow":
      top = `${(offsetY / canvas.height) * 100}%`;
      translateY = "0";
      break;
    case "center":
    default:
      // Use offsetY as absolute position from top
      top = `${(offsetY / canvas.height) * 100}%`;
      translateY = "-50%";
      break;
  }

  if (layer.type === "text") {
    translateY = "0";
  }

  return {
    position: "absolute",
    left,
    top,
    width: layer.type === "text" ? `${widthPercent}%` : `${widthPercent}%`,
    height: layer.type === "text" ? "auto" : `${heightPercent}%`,
    transform: `translate(${translateX}, ${translateY}) rotate(${layer.rotation}deg)`,
    opacity: layer.opacity,
    cursor: layer.locked ? "default" : "pointer",
    zIndex: layer.zIndex,
  };
}
