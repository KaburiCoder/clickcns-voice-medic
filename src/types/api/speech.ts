import type { LlmRoom } from "./llm/chat";
import type { RecordsResponse } from "./records";
import type { Transcript } from "./transcript";

export interface TranscribeV2Response {
  transcript: string;
  language: string;
}

export interface TranscribeWithTranslationResponse {
  transcripts: Transcript[];
}

export interface UploadBlobs {
  vadBuffer: ArrayBuffer | undefined;
  totalBuffer: ArrayBuffer;
  opusBlob: Blob;
  duration: number;
  startTime?: number;
  endTime?: number;
}
export interface UploadRequest extends UploadBlobs {
  chart: string;
  transcript: string;
  recordId?: string;
}

export interface UploadV3Request {
  opusBlob: ArrayBuffer | Blob;
  chart: string;
  transcript: string;
  transcripts: Transcript[];
  durationSeconds: number;
  recordId?: string;
}

export interface UploadResponse {
  record: Partial<RecordsResponse>;
  audioFiles: AudioFile[];
  isFirstUpload?: boolean;
}

export interface ActivateRecordInfo
  extends Partial<Omit<RecordsResponse, "llmRooms">> {
  llmRoom?: LlmRoom;
}

export interface AudioFile {
  id: string;
  recordId: string;
  bucket: string;
  objectKey: string;
  fileSize: string;
  durationSeconds: number;
  mimeType: string;
  updatedAt: Date;

  transcripts?: AudioTranscript[];
}

export interface AudioTranscript {
  id: string;
  transcript: string;
  language: string;
  translatedText: string;
  translatedLanguage: string;
  audioFileId: string;
  start: number;
  end: number;
  createdAt: Date;
}
export interface ChatRoomsResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: string;
  name: string;
  ykiho: string;
  chart: string;
}

export interface UpsertPatientRequest {
  chart: string;
  name?: string;
}

export type ResummaryPart =
  | "cc"
  | "subjective"
  | "objective"
  | "assessment"
  | "plan";
export interface ResummaryPartRequest {
  recordId: string;
  level: number;
  part: ResummaryPart;
}

export interface UpsertPatientRequest {
  chart: string;
  name?: string;
}
