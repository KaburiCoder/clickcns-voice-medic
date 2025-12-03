import type { UpsertUserSettingRequest, UserSetting } from "../../types";
import { apiClient } from "../axios";

export const userSettingsApi = {
  getUserSettings: async (): Promise<UserSetting> => {
    const response = await apiClient.get("/user-settings");
    return response.data;
  },

  updateUserSettings: async (
    settings: UpsertUserSettingRequest,
  ): Promise<UserSetting> => {
    const response = await apiClient.put("/user-settings", settings);
    return response.data;
  },
};
