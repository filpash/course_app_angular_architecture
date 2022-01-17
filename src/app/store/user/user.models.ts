import { User } from "@app/models/backend";

export { User, Employee, Recruiter } from "@app/models/backend";

// Requests models

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export type UserCreateRequest = Omit<User, 'uid' | 'email' | 'created'>
