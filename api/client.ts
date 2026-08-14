import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  timeout: 60_000,
});

export interface ApiError {
  status: number | null;
  message: string;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const apiError: ApiError = {
      status: error.response?.status ?? null,
      message: error.response?.data?.message ?? error.message,
    };
    return Promise.reject(apiError);
  }
);
