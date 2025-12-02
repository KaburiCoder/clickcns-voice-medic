import { apiClient } from "../../axios";
import type {
  GetRecordsByDatesRequest,
  GetRecordsByDatesResponse,
  Patient,
  RecordData,
  RecordsPageRequest,
  RecordsResponse,
  RecordsWithPageResponse,
} from "../../../types/api";
import type { PatientInfoDto } from "../../../types";

export const speechRecords = {
  getRecords: async (): Promise<RecordsResponse[]> => {
    const res = await apiClient.get("/speech/records");
    return res.data;
  },

  getRecordsWithPage: async (
    dto: RecordsPageRequest
  ): Promise<RecordsWithPageResponse> => {
    const res = await apiClient.post("/speech/records", dto);
    return res.data;
  },

  deleteRecord: async ({
    recordId,
  }: {
    recordId: string;
  }): Promise<RecordsResponse> => {
    const res = await apiClient.delete(`/speech/records/${recordId}`);
    return res.data;
  },

  getRecordById: async ({
    recordId,
  }: {
    recordId: string;
  }): Promise<RecordsResponse> => {
    const res = await apiClient.get(`/speech/records/${recordId}/details`);
    return res.data;
  },

  getTodayRecord: async ({
    chart,
  }: {
    chart: string;
  }): Promise<Partial<RecordsResponse>> => {
    const res = await apiClient.get(`/speech/records/details/today`, {
      params: { chart },
    });
    return res.data;
  },

  getRecordsByChart: async ({
    chart,
  }: {
    chart: string;
  }): Promise<RecordsResponse[]> => {
    const res = await apiClient.get(`/speech/records/${chart}`);
    return res.data;
  },

  getRecordFromImage: async ({
    imageUrl,
  }: {
    imageUrl: string;
  }): Promise<Partial<RecordsResponse>> => {
    const res = await apiClient.post(`/speech/records/from-image`, {
      imageUrl,
    });
    return res.data;
  },

  getRecordFromAgent: async (
    patientInfo: PatientInfoDto
  ): Promise<Partial<RecordsResponse>> => {
    const res = await apiClient.post(`/speech/records/from-agent`, patientInfo);
    return res.data;
  },

  // --- admin ---
  getRecordsByDates: async ({
    startDate,
    endDate,
    page,
    searchText,
    ykiho,
    username,
  }: GetRecordsByDatesRequest): Promise<GetRecordsByDatesResponse> => {
    const res = await apiClient.get("/speech/records/by-dates", {
      params: {
        startDate,
        endDate,
        page: Number(page),
        ...(searchText && { searchText }),
        ...(ykiho && { ykiho }),
        ...(username && { username }),
      },
    });
    return res.data;
  },

  getPatients: async (): Promise<Patient[]> => {
    const res = await apiClient.get("/speech/patients");
    return res.data;
  },

  getRecordData: async ({
    recordId,
  }: {
    recordId: string;
  }): Promise<RecordData> => {
    const res = await apiClient.get(`/speech/record-datas/${recordId}`);
    return res.data;
  },
};
