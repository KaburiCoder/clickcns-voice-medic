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
      credentials
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
      `/auth/user/generate-key/${userId}`
    );
    return response.data;
  },

  // --- 관리자 ---
  adminLogin: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/admin-login",
      credentials
    );
    return response.data;
  },

  updateUser: async (data: Partial<UserDto>): Promise<{ user: UserDto }> => {
    const response = await apiClient.put<{ user: UserDto }>(
      `/auth/user/${data.id}`,
      data
    );
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await apiClient.delete(`/auth/user/${userId}`);
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> => {
    await apiClient.patch("/auth/me/change-password", data);
  },
};
