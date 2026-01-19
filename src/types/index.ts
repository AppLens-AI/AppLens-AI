export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Template {
  id: string;
  name: string;
  platform: "ios" | "android" | "both";
  category: string;
  thumbnail: string;
  thumbnails?: string[];
  jsonConfig: TemplateConfig;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateConfig {
  canvas: CanvasConfig;
  layers: LayerConfig[];
  exports: ExportSize[];
  slides: SlideData[];
}

export interface CanvasConfig {
  width: number;
  height: number;
  backgroundColor: string;
}

export interface LayerConfig {
  id: string;
  type: "text" | "image" | "shape" | "screenshot";
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  visible: boolean;
  locked: boolean;
  opacity: number;
  properties: TextProperties | ImageProperties | ShapeProperties;
  zIndex: number;
}

export interface TextProperties {
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  align: "left" | "center" | "right";
  lineHeight: number;
  // Layout configuration
  position?: "top" | "center" | "bottom";
  anchorX?: "left" | "center" | "right";
  anchorY?: "top" | "center" | "bottom";
  offsetX?: number;
  offsetY?: number;
}

export interface ImageProperties {
  src: string;
  placeholder: string;
  borderRadius: number;
  shadow: boolean;
  shadowBlur: number;
  shadowColor: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  position?: "center" | "top" | "bottom" | "top-overflow" | "bottom-overflow";
  anchorX?: "left" | "center" | "right";
  anchorY?: "top" | "center" | "bottom";
  offsetX?: number;
  offsetY?: number;
  scale?: number;
}

export interface ShapeProperties {
  fill: string;
  stroke: string;
  strokeWidth: number;
  cornerRadius: number;
  shapeType: "rect" | "circle" | "rounded";
  position?: "top" | "center" | "bottom";
  anchorX?: "left" | "center" | "right";
  anchorY?: "top" | "center" | "bottom";
  offsetX?: number;
  offsetY?: number;
}

export interface ExportSize {
  name: string;
  platform: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  userId: string;
  templateId: string;
  name: string;
  thumbnail: string;
  projectConfig: ProjectConfig;
  template?: Template;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectConfig {
  canvas: CanvasConfig;
  layers: LayerConfig[];
  images: ImageAsset[];
  slides?: SlideData[];
  exports?: ExportSize[];
}

export interface SlideData {
  id: string;
  canvas: CanvasConfig;
  layers: LayerConfig[];
}

export interface ImageAsset {
  id: string;
  url: string;
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}
