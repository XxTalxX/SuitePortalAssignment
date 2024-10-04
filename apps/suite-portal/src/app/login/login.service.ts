import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../reducers/index';
import * as LoginActions from './store/login.actions';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private tokenExpirationTimer: any;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new LoginActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}