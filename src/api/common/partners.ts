import type { PartnerDto } from "@/types";
import { apiClient } from "../axios";

export const partnersApi = {
  // 모든 파트너 조회
  getPartners: async (): Promise<PartnerDto[]> => {
    const response = await apiClient.get("/partners");
    return response.data;
  },
};
