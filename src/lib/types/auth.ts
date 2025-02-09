export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  need2FA: boolean;
  isLockout: boolean;
  isNotAllowed: boolean;
  token: string;
  isSuccess: boolean;
  errorCode: number;
  errors: string[];
}