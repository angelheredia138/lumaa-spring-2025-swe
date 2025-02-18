export interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: number;
}

export interface User {
  id: number;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword?: string;
}

export interface AuthResponse {
  token: string;
}
