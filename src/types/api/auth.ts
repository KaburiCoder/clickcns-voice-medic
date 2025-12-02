import type { Institution } from "./institution";

export interface UserDto {
  id: string;
  name: string;
  username: string;
  email?: string;
  phone?: string;
  ykiho?: string;
  key: string;
  role: "admin" | "user";
  createdAt: Date | null;
  updatedAt: Date | null;
  institution?: Institution;
  partnerId?: string | null;
}

export interface Tokens {
  accessToken: string;
}

export interface AuthResponse {
  tokens: Tokens;
  user: UserDto;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  ykiho: string;
  name: string;
  email?: string;
  phone?: string;
  role: "user";
}
