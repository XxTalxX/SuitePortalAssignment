import { Action } from '@ngrx/store';

export const LOGIN_START = '[Login] Login Start';
export const LOGIN_SUCCESS = '[Login] Login';
export const LOGIN_FAIL = '[Login] Login Fail';
export const CLEAR_ERROR = '[Login] Clear Error';
export const AUTO_LOGIN = '[Login] Auto Login';
export const LOGOUT = '[Login] Logout';

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(
    public payload: {
      email: string;
      adminId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type LoginActions =
  | LoginSuccess
  | Logout
  | LoginStart
  | LoginFail
  | ClearError
  | AutoLogin;