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
}

export type UpsertUserSettingRequest = Partial<BaseUpsertUserSettingRequest>;

export interface UserSetting extends BaseUpsertUserSettingRequest {
  id: string;
  userId: string;
}
