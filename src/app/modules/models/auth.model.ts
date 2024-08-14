import { IUser } from "./user.model";


// auth mode is what comes back after login
export interface IAuthInfo {
  payload?: IUser;
  token?: string;
  refreshToken?: string;
  expiration: Date; // number of milliseconds of its life time
}

// example returnd from server
// {
// 	accessToken: 'access_token',
// 	refreshToken: "refres_token",
// 	payload: {
// 		name: 'maybe name',
// 		id: 'id',
// 		email: 'username'
// 	},
// 	// expires in is an absolute lifetime in seconds
// 	expiresIn: 3600
// }

export const NewAuthInfo = (data: any): IAuthInfo => {
  return {
    payload: {
      email: data.email,
      roles:data.roles,
    },
    token: data.token,
    //refreshToken: data.refreshToken,
    // map expiresIn value to exact time stamp
    expiration:data.expiration,
  };
};

export const PrepSetSession = (auth: IAuthInfo): any => {
  // in real life, return only information the server might need
  return {
    auth: auth,
    cookieName: 'CrCookie', // this better be saved in external config
  };
};

export const PrepLogout = (): any => {
  return {
    cookieName: 'CrCookie',
  };
};
