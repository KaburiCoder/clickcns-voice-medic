import type { CaptureRect } from "@/types";
import { apiClient } from "../axios";

export const captureRectsApi = {
  getMy: async (): Promise<CaptureRect> => {
    const res = await apiClient.get("/capture-rects/my");
    return res.data;
  },
};
