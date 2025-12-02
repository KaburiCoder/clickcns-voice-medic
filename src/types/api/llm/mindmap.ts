export interface MindmapNodeData {
  label: string;
  [key: string]: MindmapNodeData | string;
}

export interface MindmapResponse {
  [key: string]: MindmapNodeData;
}
