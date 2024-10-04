import { Admin } from '../../admin/admin.model';
import * as LoginActions from './login.actions';

export interface State {
  admin: Admin;
  authError: string;
}

const initialState: State = {
  admin: null!,
  authError: null!,
};

export function loginReducer(state = initialState, action: LoginActions.LoginActions): State {
  switch (action.type) {
    case LoginActions.LOGIN_SUCCESS:
      const admin = new Admin(
        action.payload.email,
        action.payload.adminId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null!,
        admin: admin,
      };
    case LoginActions.LOGOUT:
      return {
        ...state,
        admin: null!
      };
    case LoginActions.LOGIN_START:
      return {
        ...state,
        authError: null!,
      };
    case LoginActions.LOGIN_FAIL:
      return {
        ...state,
        admin: null!,
        authError: action.payload,
      };
    case LoginActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null!
      };
    default:
      return state;
  }
}