import { User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;
export type SafeUser = Pick<User, 'id' | 'email' | 'name'>;

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
}

export interface LoginResponse {
  access_token: string;
  user: SafeUser;
}