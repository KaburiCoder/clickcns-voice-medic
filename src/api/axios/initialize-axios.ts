import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";
// Axios 인스턴스 생성

interface CreateAxiosArg extends CreateAxiosDefaults {
  baseURL: string;
  getAccessToken: () => string | null;
  getRefreshAccessToken: () => Promise<string>;
  onUnauthorized?: () => void;
}

export let apiClient: AxiosInstance;

export const initailizeAxios = ({
  baseURL,
  timeout = 120_000,
  withCredentials = true,
  headers,
  getAccessToken,
  getRefreshAccessToken,
  onUnauthorized,
  ...props
}: CreateAxiosArg) => {
  apiClient = axios.create({
    baseURL,
    timeout,
    withCredentials,
    headers: headers || {
      "Content-Type": "application/json",
    },
    ...props,
  });

  apiClient.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 - Token 만료 시 자동 갱신
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // 로그인 요청은 인터셉터에서 처리하지 않음
      if (originalRequest.url?.includes("/auth/login")) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // fetch 기반 refreshAccessToken 사용 (쿠키 자동 전송)
          const accessToken = await getRefreshAccessToken();
          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh 실패 시 토큰만 정리하고 리다이렉트는 하지 않음
          onUnauthorized?.();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
  return apiClient;
};
