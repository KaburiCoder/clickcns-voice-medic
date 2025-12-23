import type { MedicalSummaryResponse } from "./llm";
import type { LlmRoom } from "./llm/chat";
import type { RecordsResponse } from "./records";
import type { Transcript } from "./transcript";

export interface TranscribeV3Response {
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

// 과거 진료 기록 요청
export interface GetPatientHistoryRequest {
  chart: string;
  excludeRecordId?: string;
}

// 과거 진료 기록
export interface PatientHistoryRecord {
  recordId: string;
  createdAt: string;
  transcript: string | null;
  medicalSummary: MedicalSummaryResponse | null;
}

// 과거 진료 요약 응답
export interface PatientHistorySummaryResponse {
  chart: string;
  patientName: string;
  totalRecords: number;
  summary: string; // 마크다운 형식
  records: PatientHistoryRecord[];
}

// 과거 진료 기록 존재 여부 응답
export interface HasPatientHistoryResponse {
  hasHistory: boolean;
}
