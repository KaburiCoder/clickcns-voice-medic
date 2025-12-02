export interface SendNotificationRequest {
  title: string;
  body: string;
  tag: string;
  data: {
    url: string;
  };
}

export interface PushSubscriptionResponse {
  id: string;
  endpoint: string;
  createdAt: string;
  updatedAt: string;
}
