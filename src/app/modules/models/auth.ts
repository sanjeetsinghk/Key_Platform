import { IUser } from "./user.model";

  // auth model
  export interface IAuthInfo {
    payload?: IUser;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number
  }