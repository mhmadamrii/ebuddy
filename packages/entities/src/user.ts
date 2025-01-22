export interface User {
  firstName: string
  lastName: string
  email: string
  age: number
  id?: string
  accessToken?: string
  [key: string]: any // For additional dynamic fields
}
