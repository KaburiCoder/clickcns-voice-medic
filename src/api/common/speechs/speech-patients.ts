import { apiClient } from "../../axios";
import type {
  GetPatientHistoryRequest,
  Patient,
  PatientHistorySummaryResponse,
  HasPatientHistoryResponse,
  UpsertPatientRequest,
} from "../../../types/api";

export const speechPatients = {
  getPatientByChart: async ({ chart }: { chart: string }): Promise<Patient> => {
    const res = await apiClient.get(`/speech/patients/${chart}`);
    return res.data;
  },

  upsertPatient: async ({
    chart,
    name,
  }: UpsertPatientRequest): Promise<Patient> => {
    const res = await apiClient.put(`/speech/patients`, { chart, name });
    return res.data;
  },

  /**
   * 과거 진료 기록 존재 여부 확인
   */
  hasPatientHistory: async ({
    chart,
  }: {
    chart: string;
  }): Promise<HasPatientHistoryResponse> => {
    const res = await apiClient.get(`/speech/patients/has-history/${chart}`);
    return res.data;
  },

  /**
   * 과거 진료 기록 요약 조회
   */
  getPatientHistorySummary: async ({
    chart,
    excludeRecordId,
    signal,
  }: GetPatientHistoryRequest & {
    signal?: AbortSignal;
  }): Promise<PatientHistorySummaryResponse> => {
    const res = await apiClient.get(`/speech/patients/history-summary`, {
      params: { chart, excludeRecordId },
      signal,
    });
    return res.data;
  },
};
