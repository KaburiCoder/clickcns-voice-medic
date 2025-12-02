import type {
  DiarizationRequest,
  DiarizationResponse,
  DiseaseRecommendationRequestDto,
  DiseaseRecommendationResponseDto,
  MedicalSummaryRequest,
  MedicalSummaryResponse,
  MindmapResponse
} from "@/types";
import { apiClient } from "../axios";

export const llmApi = {
  diarization: async (
    request: DiarizationRequest,
    signal?: AbortSignal
  ): Promise<DiarizationResponse> => {
    const response = await apiClient.post("/llm/diarization", request, {
      signal,
    });

    return response.data;
  },

  medicalSummary: async ({
    request,
    signal,
  }: {
    request: MedicalSummaryRequest;
    signal: AbortSignal;
  }): Promise<MedicalSummaryResponse> => {
    const response = await apiClient.post("/llm/medical-summary", request, {
      signal,
    });

    return response.data;
  },

  mindmap: async ({
    conversation,
  }: {
    conversation: string;
  }): Promise<MindmapResponse> => {
    const response = await apiClient.post(`/llm/mindmap`, { conversation });
    return response.data;
  },

  diseaseRecommendation: async ({
    conversation,
  }: DiseaseRecommendationRequestDto): Promise<DiseaseRecommendationResponseDto> => {
    const response = await apiClient.post(`/llm/disease-recommendation`, {
      conversation,
    });
    return response.data;
  },
};
