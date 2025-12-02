import type { BaseResponseDto } from ".";

export interface PingToAgentResponseDto extends BaseResponseDto {
  success: boolean;
  targetAppName?: string;
}
