export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  [key: string]: any; // For additional dynamic fields
}
