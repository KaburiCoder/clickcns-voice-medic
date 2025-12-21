import type { UserDto } from "./auth";
import type { PromptResult } from "./custom-prompts";
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
  user?: UserDto;
  llmRooms?: LlmRoom[];
  audioFiles?: AudioFile[];
  recordData?: Partial<RecordData> | null;
  promptResults?: PromptResult[];
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

export interface GetRecordsByDatesRequest {
  startDate: string;
  endDate: string;
  page: number;
  searchText?: string;
  ykiho?: string;
  username?: string;
}

export interface GetRecordsByDatesResponse {
  totalCount: number;
  audioFileCount: number;
  avgDurationSeconds: number;
  totalDurationSeconds: number;
  records: RecordsResponse[];
}
