import type {
  Notice,
  NoticeListRequest,
  NoticeListResponse,
} from "@/types";
import { apiClient } from "../axios";

export const noticeApi = {
  getNotices: async (
    params?: NoticeListRequest,
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
};
