import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userNotificationsApi } from "../../api";
import { FEEDBACKS_QUERY_KEY } from "../feedbacks";

export const useUserNotifications = () => {
  return useQuery({
    queryKey: ["user-notifications"],
    queryFn: userNotificationsApi.getNotifications,
    refetchInterval: 180_000, // 3분마다 새로고침
  });
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: userNotificationsApi.getUnreadNotificationCount,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userNotificationsApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-notification-count"] });
      queryClient.invalidateQueries({ queryKey: FEEDBACKS_QUERY_KEY });
    },
  });
};
