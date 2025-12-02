import type { CreateNoticeRequest, Notice, NoticeListRequest, NoticeListResponse, UpdateNoticeRequest } from "@/types";
import { apiClient } from "../axios";

export const noticeApi = {
  getNotices: async (
    params?: NoticeListRequest
  ): Promise<NoticeListResponse> => {
    const response = await apiClient.post<NoticeListResponse>("/notices/page", {
      page: params?.page ?? 1,
      count: params?.count ?? 10,
      searchText: params?.searchText,
      showPublishedOnly: params?.showPublishedOnly ?? true,
    });
    return response.data;
  },

  getNotice: async (id: string): Promise<Notice> => {
    const response = await apiClient.get<Notice>(`/notices/${id}`);
    return response.data;
  },

  // Create a new notice
  createNotice: async (data: CreateNoticeRequest): Promise<Notice> => {
    const response = await apiClient.post<Notice>("/notices", data);
    return response.data;
  },

  // Update an existing notice
  updateNotice: async (
    id: string,
    data: UpdateNoticeRequest
  ): Promise<Notice> => {
    const response = await apiClient.put<Notice>(`/notices/${id}`, data);
    return response.data;
  },

  // Delete a notice
  deleteNotice: async (id: string): Promise<void> => {
    await apiClient.delete(`/notices/${id}`);
  },
};
