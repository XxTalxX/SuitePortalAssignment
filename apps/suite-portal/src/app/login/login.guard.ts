import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from '../reducers/index';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean |
        UrlTree |
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> {
        // return this.store.select('login').pipe(
        //     take(1),
        //     map(loginState => {
        //       console.log("loginstate " + JSON.stringify(loginState));
        //       return loginState.admin;
        //     }),
        //     map(admin => {
        //         console.log("admin " + admin);
        //         const isLoggedIn = !!admin;
        const isLoggedIn = !!localStorage.getItem('adminData');
                if (isLoggedIn && route.url.length > 1) {
                    if(route.url[1].path.includes('login')) {
                    return this.router.createUrlTree(['/home']);
                    }
                } else if(isLoggedIn){
                    return true;
                } else if(!isLoggedIn && route.url.length > 1) {
                    if(route.url[1].path.includes('login')) {
                        return true;
                    }
                } else {
                    return this.router.createUrlTree(['/admin/login']);
                }
           // })
     //   );
    }
}