export interface FeedbackDetail {
  id: string;
  feedbackId: string;
  title: string;
  body: string;
  recordId?: string;
  recordFileId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  id: string;
  userId: string;
  status: 'pending' | 'resolved';
  userName: string;
  institutionName: string | null;
  createdAt: string;
  updatedAt: string;
  feedbackDetail: FeedbackDetail;
}

export interface FeedbackListResponse {
  feedbacks: Feedback[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export interface FeedbackListRequest {
  page?: number;
  count?: number;
  status?: 'pending' | 'resolved';
}

export interface CreateFeedbackRequest {
  feedbackDetail: {
    title: string;
    body: string;
    recordId?: string;
    recordFileId?: string;
  };
}

export interface FeedbackComment {
  id: string;
  feedbackId: string;
  userId: string;
  userName: string;
  isAdmin: boolean;
  body: string;
  refId: string | null;
  createdAt: string;
  updatedAt: string;
  children?: FeedbackComment[];
}

export interface FeedbackCommentsResponse {
  comments: FeedbackComment[];
}

export interface CreateFeedbackCommentRequest {
  body: string;
  refId?: string;
}
