export interface User {
    id: number;
    username: string;
    email: string;
    password?: string; // only used internally, not exposed in response
  }
  