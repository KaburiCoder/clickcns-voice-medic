import { apiClient } from "../../api/axios";
import type {
  Feedback,
  FeedbackListResponse,
  FeedbackListRequest,
  CreateFeedbackRequest,
  FeedbackComment,
  FeedbackCommentsResponse,
  CreateFeedbackCommentRequest,
} from "../../types";

export const feedbackApi = {
  // 피드백 목록 조회 (페이지네이션)
  listFeedbacks: async (
    params: FeedbackListRequest
  ): Promise<FeedbackListResponse> => {
    const response = await apiClient.post<FeedbackListResponse>(
      "/feedbacks/page",
      {
        page: params.page ?? 1,
        count: params.count ?? 30,
        status: params.status,
      }
    );
    return response.data;
  },

  // 피드백 상세 조회
  getFeedback: async (id: string): Promise<Feedback> => {
    const response = await apiClient.get<Feedback>(`/feedbacks/${id}`);
    return response.data;
  },

  // 피드백 생성
  createFeedback: async (data: CreateFeedbackRequest): Promise<Feedback> => {
    const response = await apiClient.post<Feedback>("/feedbacks", data);
    return response.data;
  },

  // 피드백 수정
  updateFeedback: async (
    id: string,
    data: Partial<CreateFeedbackRequest> & { status?: "pending" | "resolved" }
  ): Promise<Feedback> => {
    const response = await apiClient.put<Feedback>(`/feedbacks/${id}`, data);
    return response.data;
  },

  // 피드백 삭제
  deleteFeedback: async (id: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete<{ success: boolean }>(
      `/feedbacks/${id}`
    );
    return response.data;
  },

  // 피드백 댓글 목록 조회
  getComments: async (
    feedbackId: string
  ): Promise<FeedbackCommentsResponse> => {
    const response = await apiClient.get<FeedbackCommentsResponse>(
      `/feedbacks/${feedbackId}/comments`
    );
    return response.data;
  },

  // 피드백 댓글 작성
  createComment: async (
    feedbackId: string,
    data: CreateFeedbackCommentRequest
  ): Promise<FeedbackComment> => {
    const response = await apiClient.post<FeedbackComment>(
      `/feedbacks/${feedbackId}/comments`,
      data
    );
    return response.data;
  },

  // 피드백 댓글 삭제
  deleteComment: async (commentId: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete<{ success: boolean }>(
      `/feedbacks/comments/${commentId}`
    );
    return response.data;
  },

  // 피드백 댓글 수정
  updateComment: async (
    commentId: string,
    data: CreateFeedbackCommentRequest
  ): Promise<FeedbackComment> => {
    const response = await apiClient.put<FeedbackComment>(
      `/feedbacks/comments/${commentId}`,
      data
    );
    return response.data;
  },
};
