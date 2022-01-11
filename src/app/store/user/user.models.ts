export { User, Employee, Recruiter } from "@app/models/backend";

// Requests models

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}
