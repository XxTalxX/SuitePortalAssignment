import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import * as LoginActions from './login.actions';
import { Admin } from '../../admin/admin.model';

const maintenanceAPI: string = "http://localhost:3333/api/";


export interface LoginResponseData {
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
}

const handleAuthentication = (expiresIn: number, email: string, adminId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const admin = new Admin(email, adminId, token, expirationDate);
  localStorage.setItem('adminData', JSON.stringify(admin));
  return new LoginActions.LoginSuccess({
    email: email,
    adminId: adminId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.message) {
    return of(new LoginActions.LoginFail(errorMessage));
  }
  if(errorRes.message.includes('Unauthorized')) {
    errorMessage = 'Wrong Email or Password';
  }
  return of(new LoginActions.LoginFail(errorMessage));
};

@Injectable()
export class LoginEffects {

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(LoginActions.LOGIN_START),
    switchMap((authData: LoginActions.LoginStart) => {
      return this.http
        .post<LoginResponseData>(maintenanceAPI + 'admin/login',
          {
            email: authData.payload.email,
            password: authData.payload.password,
          }
        )
        .pipe(
          tap(resData => {
            this.loginService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(LoginActions.LOGIN_SUCCESS),
    tap((authSuccessAction: LoginActions.LoginSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/maintenance-requests']);
      }
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(LoginActions.AUTO_LOGIN),
    map(() => {
      const adminData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('adminData'));
      if (!adminData) {
        return { type: 'DUMMY' };
      }

      const loadedAdmin = new Admin(
        adminData.email,
        adminData.id,
        adminData._token,
        new Date(adminData._tokenExpirationDate)
      );

      if (loadedAdmin.token) {
        const expirationDuration =
          new Date(adminData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.loginService.setLogoutTimer(expirationDuration);
        return new LoginActions.LoginSuccess({
          email: loadedAdmin.email,
          adminId: loadedAdmin.id,
          token: loadedAdmin.token,
          expirationDate: new Date(adminData._tokenExpirationDate),
          redirect: false
        });
      }
      return { type: 'DUMMY' };
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(LoginActions.LOGOUT),
    tap(() => {
      this.loginService.clearLogoutTimer();
      localStorage.removeItem('adminData');
      this.router.navigate(['/']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}
}