interface BaseUpsertUserSettingRequest {
  language: "ko" | "en";
  ccSummaryLevel: number;
  subjectiveSummaryLevel: number;
  objectiveSummaryLevel: number;
  assessmentSummaryLevel: number;
  planSummaryLevel: number;
  fileStorageType: "local" | "s3" | "localAndS3";
  includeSummaryTitleOnCopy: boolean;
  ccCustomLevelPrompt?: string;
  sCustomLevelPrompt?: string;
  oCustomLevelPrompt?: string;
  aCustomLevelPrompt?: string;
  pCustomLevelPrompt?: string;
  useAutoRecord?: boolean;
  // 실험적 기능
  ex_useProofreading?: boolean; // 문장 교정 기능 사용 여부
}

export type UpsertUserSettingRequest = Partial<BaseUpsertUserSettingRequest>;

export interface UserSetting extends BaseUpsertUserSettingRequest {
  id: string;
  userId: string;
}
