import type { Institution } from "../../types";
import { apiClient } from "../axios";

export const institutionsApi = {
  getInstitutions: async (): Promise<Institution[]> => {
    const response = await apiClient.get<Institution[]>("institutions");
    return response.data;
  },
  register: async (data: Institution): Promise<Institution> => {
    const response = await apiClient.post<Institution>("institutions", data);
    return response.data;
  },
  update: async ({
    ykiho,
    data,
  }: {
    ykiho: string;
    data: Partial<Institution>;
  }): Promise<Institution> => {
    const response = await apiClient.patch(`institutions/${ykiho}`, data);
    return response.data;
  },
  delete: async (ykiho: string): Promise<void> => {
    await apiClient.delete(`institutions/${ykiho}`);
  },
};
