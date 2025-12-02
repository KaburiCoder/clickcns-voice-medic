import type {
  CaptureRect,
  CreateCaptureRectRequest,
  DeleteCaptureRectResponse,
  UpdateCaptureRectRequest,
} from "@/types";
import { apiClient } from "../axios";

export const captureRectsApi = {
  getMy: async (): Promise<CaptureRect> => {
    const res = await apiClient.get("/capture-rects/my");
    return res.data;
  },
  // 모든 캡처 영역 조회 (GET /capture-rects)
  getCaptureRects: async (): Promise<CaptureRect[]> => {
    const response = await apiClient.get<CaptureRect[]>("capture-rects");
    return response.data;
  },

  // 특정 캡처 영역 조회 (GET /capture-rects/:id)
  getCaptureRect: async (id: string): Promise<CaptureRect> => {
    const response = await apiClient.get<CaptureRect>(`capture-rects/${id}`);
    return response.data;
  },

  // 캡처 영역 생성 (POST /capture-rects)
  createCaptureRect: async (
    data: CreateCaptureRectRequest
  ): Promise<CaptureRect> => {
    const response = await apiClient.post<CaptureRect>("capture-rects", data);
    return response.data;
  },

  // 캡처 영역 수정 (PATCH /capture-rects/:id)
  updateCaptureRect: async ({
    id,
    data,
  }: {
    id: string;
    data: UpdateCaptureRectRequest;
  }): Promise<CaptureRect> => {
    const response = await apiClient.patch<CaptureRect>(
      `capture-rects/${id}`,
      data
    );
    return response.data;
  },

  // 캡처 영역 삭제 (DELETE /capture-rects/:id)
  deleteCaptureRect: async (id: string): Promise<DeleteCaptureRectResponse> => {
    const response = await apiClient.delete<DeleteCaptureRectResponse>(
      `capture-rects/${id}`
    );
    return response.data;
  },
};
