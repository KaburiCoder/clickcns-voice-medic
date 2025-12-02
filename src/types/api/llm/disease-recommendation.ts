export interface DiseaseRecommendationRequestDto {
  conversation: string; // 대화 내용
}

export interface DiseaseRecommendationResponseDto {
  data: DiseaseRecommendation[];
  message?: string;
}

export interface DiseaseRecommendation {
  code: string;
  name: string;
  percent: number;
  symptoms: string[];
}
