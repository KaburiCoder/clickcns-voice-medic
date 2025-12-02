import { apiClient } from "../../axios";
import type { AudioFile } from "../../../types/api";

export const speechAudios = {
  deleteAudioFile: async ({
    audioFileId,
  }: {
    audioFileId: string;
  }): Promise<AudioFile> => {
    const res = await apiClient.delete(`/speech/audios/${audioFileId}`);
    return res.data;
  },
};
