export type UserNotificationTargetType = "feedback" | "notice";

export interface UserNotification {
  id: string;
  userId: string;
  targetId: string;
  targetType: UserNotificationTargetType;
  title: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  isAlert: boolean;
}

export interface UserNotificationListResponse extends Array<UserNotification> {}

export interface MarkAsReadRequest {
  targetType: UserNotificationTargetType;
}
