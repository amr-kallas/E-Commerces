export type User = {
  email: string
  name: string
  role: string
}
export type GetUser = {
  id: string
} & User
export type EditForm = {
  body: User
  id: string
}
export type AllUser = GetUser[]
export type GetMe = GetUser
export type AddUser = {
  password: string
} & User
