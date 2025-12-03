import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { feedbackApi } from "../../../api";
import type {
  CreateFeedbackCommentRequest,
  CreateFeedbackRequest,
  FeedbackListRequest,
} from "../../../types";

const FEEDBACKS_QUERY_KEY = ["feedbacks"];

interface UseFeedbacksParams extends FeedbackListRequest {
  enabled?: boolean;
}

export const useFeedbacks = ({
  enabled,
  ...params
}: UseFeedbacksParams = {}) => {
  return useQuery({
    queryKey: [...FEEDBACKS_QUERY_KEY, params],
    queryFn: () => feedbackApi.listFeedbacks(params),
    enabled: enabled ?? true,
  });
};

export const useFeedbackDetail = (id: string | null) => {
  return useQuery({
    queryKey: [...FEEDBACKS_QUERY_KEY, "detail", id],
    queryFn: () => feedbackApi.getFeedback(id!),
    enabled: !!id,
  });
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFeedbackRequest) =>
      feedbackApi.createFeedback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEEDBACKS_QUERY_KEY });
    },
  });
};

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateFeedbackRequest> & {
        status?: "pending" | "resolved";
      };
    }) => feedbackApi.updateFeedback(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: FEEDBACKS_QUERY_KEY });
      queryClient.setQueryData(
        [...FEEDBACKS_QUERY_KEY, "detail", data.id],
        data
      );
    },
  });
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => feedbackApi.deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEEDBACKS_QUERY_KEY });
    },
  });
};

export const useFeedbackComments = (feedbackId: string | null) => {
  return useQuery({
    queryKey: [...FEEDBACKS_QUERY_KEY, "comments", feedbackId],
    queryFn: () => feedbackApi.getComments(feedbackId!),
    enabled: !!feedbackId,
  });
};

export const useCreateFeedbackComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      feedbackId,
      data,
    }: {
      feedbackId: string;
      data: CreateFeedbackCommentRequest;
    }) => feedbackApi.createComment(feedbackId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...FEEDBACKS_QUERY_KEY, "comments", variables.feedbackId],
      });
    },
  });
};

export const useDeleteFeedbackComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => feedbackApi.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...FEEDBACKS_QUERY_KEY, "comments"],
      });
    },
  });
};

export const useUpdateFeedbackComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: string;
      data: CreateFeedbackCommentRequest;
    }) => feedbackApi.updateComment(commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...FEEDBACKS_QUERY_KEY, "comments"],
      });
    },
  });
};
