import type {
  DiarizationMessage,
  LlmRoom,
  MedicalSummaryResponse,
} from "./llm";
import type { AudioFile, Patient } from "./speech";

export interface RecordsResponse {
  id: string;
  chart: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  ykiho: string | null;
  patient: Patient;
  llmRooms?: LlmRoom[];
  audioFiles?: AudioFile[];
  recordData?: Partial<RecordData> | null;
}

export interface RecordData {
  id: string;
  createdAt: Date;
  recordId: string;
  medicalSummary: MedicalSummaryResponse | null;
  speakerDiarization: DiarizationMessage[] | null;
}

export interface RecordsPageRequest {
  page: number;
  count: number;
  searchText?: string;
}

export interface RecordsWithPageResponse {
  records: RecordsResponse[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
