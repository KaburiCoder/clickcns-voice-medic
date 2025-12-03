import type { PartnerDto } from "../../types";
import { apiClient } from "../axios";
import type { CreatePartnerRequest, UpdatePartnerRequest } from "../../types/api";

export const partnersApi = {
  // 모든 파트너 조회
  getPartners: async (): Promise<PartnerDto[]> => {
    const response = await apiClient.get("/partners");
    return response.data;
  },

  // 파트너 상세 조회
  getPartner: async (id: string): Promise<PartnerDto> => {
    const response = await apiClient.get(`/partners/${id}`);
    return response.data;
  },

  // 파트너 생성
  createPartner: async (request: CreatePartnerRequest): Promise<PartnerDto> => {
    const response = await apiClient.post("/partners", request);
    return response.data;
  },

  // 파트너 수정
  updatePartner: async (
    id: string,
    request: UpdatePartnerRequest
  ): Promise<PartnerDto> => {
    const response = await apiClient.patch(`/partners/${id}`, request);
    return response.data;
  },

  // 파트너 삭제
  deletePartner: async (id: string): Promise<PartnerDto> => {
    const response = await apiClient.delete(`/partners/${id}`);
    return response.data;
  },
};
