import { apiRequest } from "./api";
import {
  LoginPayload,
  RegisterPayload,
  DashboardResponse,
} from "@/types/auth";

export const authService = {
  login,
  register,
  forgotPassword,
  verifyToken,
  getDashboard,
  logout,
};
interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
    };
    token: string;
  };
}

function login(data: LoginPayload) {
  return apiRequest<LoginResponse>("/api/auth/login", "POST", data);
}

function register(data: RegisterPayload) {
  return apiRequest<{ success: boolean; data?: {user: {
        id: string;
        email: string;
      };
    }; message: string }>(
    "/api/auth/register",
    "POST",
    data
  );
}

function forgotPassword(data: { email: string }) {
  return apiRequest("/api/auth/forgot", "POST", data);
}

function verifyToken(token: string) {
  return apiRequest("/api/auth/verify", "GET", undefined, {
    Authorization: `Bearer ${token}`,
  });
}

function getDashboard(token: string) {
  return apiRequest<DashboardResponse>("/api/dashboard", "GET", undefined, {
    Authorization: `Bearer ${token}`,
  });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
