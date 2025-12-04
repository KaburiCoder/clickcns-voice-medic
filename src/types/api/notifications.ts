export interface UserNotification {
  id: string;
  userId: string;
  targetId: string;
  targetType: "feedback" | "notice";
  title: string;
  isRead: boolean;
  createdAt: string;
}

export interface UserNotificationListResponse extends Array<UserNotification> {}