import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as fromApp from '../reducers/index';
import { Store } from '@ngrx/store';
import * as LoginActions from './store/login.actions'



@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = null;
  private loginSubscription: Subscription;

  constructor(private fb: FormBuilder, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      adminEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });

    this.loginSubscription = this.store.select('login').subscribe((loginState) => {
      this.errorMessage = loginState.authError;
    });
  }

  onSubmit() {
    const adminEmail = this.loginForm.get('adminEmail').value;
    const password = this.loginForm.get('password').value;
    if(!this.loginForm.valid) {
      return;
    }
    this.store.dispatch(new LoginActions.LoginStart({email: adminEmail, password: password}))
    this.loginForm.reset();
  }

  ngOnDestroy() {
    if(this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if(this.errorMessage) {
    this.store.dispatch(new LoginActions.ClearError());
    }
  }
}
