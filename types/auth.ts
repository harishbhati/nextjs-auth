export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface DashboardResponse {
  user: {
    _id: string;
    email: string;
  };
  stats: {
    projects: number;
    notifications: number;
  };
}
