export interface LoginResponsePayload {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
}

export interface RegisterResponse {
  payload: string;
  message: string;
}

export interface LoginResponse {
  payload: LoginResponsePayload;
  message: string;
}
