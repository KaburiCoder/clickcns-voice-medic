import { apiClient } from "../../axios";
import type { Patient, UpsertPatientRequest } from "../../../types/api";

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
};
