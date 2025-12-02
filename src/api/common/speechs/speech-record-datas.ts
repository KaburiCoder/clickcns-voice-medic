import { apiClient } from "../../axios";
import type { MedicalSummaryResponse, ResummaryPartRequest } from "../../../types/api";

export const speechRecordData = {
  resummaryPart: async ({
    recordId,
    level,
    part,
  }: ResummaryPartRequest): Promise<MedicalSummaryResponse> => {
    const res = await apiClient.post(`/speech/record-datas/resummary/part`, {
      recordId,
      level,
      part,
    });
    return res.data;
  },
};
