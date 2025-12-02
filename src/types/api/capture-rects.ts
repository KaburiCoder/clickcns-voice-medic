export interface CaptureOnlyRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CaptureRect extends CaptureOnlyRect {
  id: string;
  name: string;
}
