import { apiClient } from "../axios";

export const audioApi = {
  getAudioFile: async ({ bucket, keys }: { bucket: string; keys: string }) => {
    const res = await apiClient.get(`/audio`, {
      params: { bucket, keys },
      responseType: "blob",
    });
    return res.data; // Blob 타입
  },
};
