export interface CaptureOnlyRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CaptureRect extends CaptureOnlyRect {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCaptureRectRequest {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UpdateCaptureRectRequest {
  name?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface DeleteCaptureRectResponse {
  message: string;
}
