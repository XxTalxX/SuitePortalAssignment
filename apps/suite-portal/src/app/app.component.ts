import { Component } from '@angular/core';
import * as LoginActions from './login/store/login.actions';
import * as fromApp from './reducers/index';
import { Store } from '@ngrx/store';


@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'suite-portal';
  isLoggedIn: boolean;
  constructor(private store: Store<fromApp.AppState>) {}

  logOut() {
    if(this.isLoggedIn) {
    this.store.dispatch(new LoginActions.Logout());
    location.reload();
    }
  }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("adminData"))) {
      if(JSON.parse(localStorage.getItem("adminData"))._token) {
            this.isLoggedIn = true;
      }
    }
  
    this.store.dispatch(new LoginActions.AutoLogin());
  }
}
