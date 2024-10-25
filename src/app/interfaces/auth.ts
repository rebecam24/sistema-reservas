export interface IAuth {
  userType?: 'regularType' | 'adminType',
  token: string,
  username: string,
  timeExpiration: Date,

}
export interface ResponseAuth {
  success: boolean
  data: Data
  message: number
}

export interface Data {
  access_token: string
  token_type: string
  expires_in: number
  user: User
  role: string[]
  message: string
}

export interface User {
  name: string
}