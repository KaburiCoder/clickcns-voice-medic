import type {
  CreateFeedbackRequest,
  FeedbackListRequest,
} from "@clickcns/vmedic-react/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { feedbackApi } from "../../api";

export const FEEDBACKS_QUERY_KEY = ["feedbacks"];

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

export const useFeedbackComments = (feedbackId: string | null) => {
  return useQuery({    
    queryKey: [...FEEDBACKS_QUERY_KEY, "comments", feedbackId],
    queryFn: () => feedbackApi.getComments(feedbackId!),
    enabled: !!feedbackId,
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
