import { Component } from '@angular/core';
import * as LoginActions from './login/store/login.actions';
import * as fromApp from './reducers/index';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'suite-portal';
  isLoggedIn: boolean;
  adminSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  logOut() {
    if(this.isLoggedIn) {
    this.store.dispatch(new LoginActions.Logout());
    location.reload();
    }
  }

  ngOnInit(): void {

    this.adminSubscription = this.store.select('login').subscribe((adminState) => {
      if(adminState.admin) {
        this.isLoggedIn = true;
      }
    })
    this.store.dispatch(new LoginActions.AutoLogin());
  }

  ngOnDestroy() : void {
    if(this.adminSubscription) {
      this.adminSubscription.unsubscribe();
    }
  }
}
