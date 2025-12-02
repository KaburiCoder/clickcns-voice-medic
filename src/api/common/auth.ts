import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserDto,
} from "@/types";
import { apiClient } from "../axios";

export const authApi = {
  register: async (dto: RegisterRequest): Promise<UserDto> => {
    const response = await apiClient.post<UserDto>("/auth/register", dto);
    return response.data;
  },
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  },
  getMe: async (): Promise<UserDto> => {
    const response = await apiClient.get<UserDto>("/auth/me");
    return response.data;
  },
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  updateMe: async (data: Partial<UserDto>): Promise<{ user: UserDto }> => {
    const response = await apiClient.patch<{ user: UserDto }>(`/auth/me`, data);
    return response.data;
  },

  generateNewUserKey: async ({
    userId,
  }: {
    userId: string;
  }): Promise<UserDto> => {
    const response = await apiClient.put<UserDto>(
      `/auth/user/generate-key/${userId}`,
    );
    return response.data;
  },
};
