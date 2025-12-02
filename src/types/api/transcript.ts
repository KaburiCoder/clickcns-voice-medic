export interface Transcript {
  source: TranscriptValue;
  translated: TranscriptValue;
  startTime?: number;
  endTime?: number;
}

export interface TranscriptValue {
  text: string;
  language: string;
}
