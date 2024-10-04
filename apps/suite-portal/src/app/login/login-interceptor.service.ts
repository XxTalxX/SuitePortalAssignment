import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { LoginService } from './login.service';
import * as fromApp from '../reducers/index';

@Injectable()
export class LoginInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService, private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('login').pipe(
      take(1),
      map(loginState => {
        return loginState.admin;
      }),
      exhaustMap(admin => {
        if (!admin) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('login', admin.token!)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}