export type UserRole = "USER" | "ADMIN";

export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  enrollCourse: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiSuccessResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export type RegisterUserResponse = ApiSuccessResponse<IUser>;
