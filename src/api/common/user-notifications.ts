import type { UserNotificationListResponse } from "../../types";
import { apiClient } from "../axios";

export const userNotificationsApi = {
  getNotifications: async (): Promise<UserNotificationListResponse> => {
    const response = await apiClient.get("/user-notifications");
    return response.data;
  },

  markAsRead: async (request: { targetId: string }): Promise<void> => {
    const response = await apiClient.patch(`/user-notifications/mark/read`, request);
    return response.data;
  },

  getUnreadNotificationCount: async (): Promise<{ count: number }> => {
    const response = await apiClient.get("/user-notifications/unread/count");
    return response.data;
  },
};
