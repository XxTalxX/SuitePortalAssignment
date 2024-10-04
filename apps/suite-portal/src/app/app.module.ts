import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NxModule } from '@nrwl/angular';
import { LoginEffects } from './login/store/login.effects'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaintenanceEffects } from './admin/store/maintenance.effects';
import { reducers } from './reducers';
import { LoginInterceptorService } from './login/login-interceptor.service';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([LoginEffects, MaintenanceEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    NxModule.forRoot(),
    StoreModule.forRoot(reducers
      // {},
      // {
      //   metaReducers: !environment.production ? [] : [],
      //   runtimeChecks: {
      //     strictActionImmutability: true,
      //     strictStateImmutability: true,
      //   },
      // }
    ),
    EffectsModule.forRoot([LoginEffects, MaintenanceEffects])
  ],
  declarations: [AppComponent, LoginComponent, AdminComponent],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
