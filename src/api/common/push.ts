import type { SendNotificationRequest } from "../../types";
import { apiClient } from "../axios";

export const pushApi = {
  /**
   * Push 구독 정보를 서버에 저장
   */
  subscribe: async (
    subscription: PushSubscription
  ): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>(
      "/push/subscribe",
      subscription.toJSON()
    );
    return response.data;
  },

  /**
   * Push 구독 해제
   */
  unsubscribe: async (endpoint: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>(
      "/push/unsubscribe",
      { endpoint }
    );
    return response.data;
  },

  /**
   * 현재 사용자의 Push 구독 상태 확인
   */
  getSubscriptionStatus: async (): Promise<{
    isSubscribed: boolean;
    endpoint?: string;
  }> => {
    const response = await apiClient.get<{
      isSubscribed: boolean;
      endpoint?: string;
    }>("/push/status");
    return response.data;
  },

  /**
   * Push 알림 전송
   * @param notification - 알림 요청 데이터
   */
  sendNotification: async (
    notification: SendNotificationRequest
  ): Promise<void> => {
    await apiClient.post("/push/send", notification);
  },
};
