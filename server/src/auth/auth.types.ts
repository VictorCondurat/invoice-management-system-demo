import { User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;

export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  access_token: string,
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface AuthUser {
  userId: string;
  email: string;
}
