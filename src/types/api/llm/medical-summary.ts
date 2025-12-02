export interface MedicalSummaryRequest {
  conversation: string;
}

export interface MedicalSummaryPlan {
  medication: string;
  education: string;
  followUp: string;
}

export interface MedicalSummaryResponse {
  cc: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: MedicalSummaryPlan;
}
