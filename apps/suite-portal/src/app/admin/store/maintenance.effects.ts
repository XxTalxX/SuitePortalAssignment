import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from "@angular/common/http";
import * as MaintenanceActions from './maintenance.actions';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../reducers/index'
import { Store } from '@ngrx/store';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';



const maintenanceAPI: string = "http://localhost:3333/api/maintenance-requests";

@Injectable()
export class MaintenanceEffects {

   @Effect()
   loadMaintenances = this.actions$.pipe(ofType(MaintenanceActions.MaintenanceActionTypes.LoadMaintenances),
   switchMap((loadMaintenancesAction: MaintenanceActions.LoadMaintenances) => {
     this.router.navigate(['/maintenance-requests'], {relativeTo: this.route});
     return this.httpClient.get<MaintenanceRequest[]>(maintenanceAPI);
   }),map((maintenance: MaintenanceRequest[]) => {
      return maintenance;
   }), map((maintenance) => {
      return new MaintenanceActions.SetMaintenances(maintenance);
   }),
   catchError((errorResponse) => {
      if(!errorResponse.error || !errorResponse.error.error) {
        return of(new MaintenanceActions.LoadMaintenancesFailure({error: errorResponse.message}));
      }
      return of(new MaintenanceActions.LoadMaintenancesFailure(errorResponse));
   }),
   );


   @Effect()
   loadMaintenance = this.actions$.pipe(ofType(MaintenanceActions.MaintenanceActionTypes.FetchMaintenance),
   withLatestFrom(this.store.select('maintenance')),
   switchMap(([action]) => {
    return this.httpClient.get<MaintenanceRequest>(maintenanceAPI + '/' + action.payload);
   }), map((maintenance: MaintenanceRequest) => {
      return maintenance;
   }),map((maintenance) => {
      return new MaintenanceActions.LoadMaintenancesSuccess(maintenance);
   }),
       catchError((errorRespone) => {
      return of(new MaintenanceActions.LoadMaintenancesFailure(errorRespone));
   }));

   @Effect()
   AddMaintenance = this.actions$.pipe(ofType(MaintenanceActions.MaintenanceActionTypes.AddMaintenance),
   withLatestFrom(this.store.select('maintenance')),
   switchMap(([actionData, maintenanceState]) => {
    return this.httpClient.post<MaintenanceRequest>(maintenanceAPI,maintenanceState.maintenance).pipe(
      map((maintenanceRequest) => new MaintenanceActions.LoadMaintenancesSuccess(maintenanceRequest)),
      catchError((error) => of(new MaintenanceActions.LoadMaintenancesFailure(error))))
   }));

   @Effect()
   CloseMaintenance = this.actions$.pipe(ofType(MaintenanceActions.MaintenanceActionTypes.CloseMaintenance),
   withLatestFrom(this.store.select('maintenance')),
   switchMap(([closedMaintenanceAction, maintenanceState]) => {
    return this.httpClient.put(maintenanceAPI +'/'+ closedMaintenanceAction.payload.id + '/close', maintenanceState.requests).pipe(
      map(() => new MaintenanceActions.CloseMaintenanceSuccess()),
    )
   }),catchError((errorRespone) => {
      return of(new MaintenanceActions.LoadMaintenancesFailure(errorRespone));
   }));

   @Effect()
   ReOpenMaintenance = this.actions$.pipe(ofType(MaintenanceActions.MaintenanceActionTypes.ReOpenMaintenance),
   withLatestFrom(this.store.select('maintenance')),
   switchMap(([reOpenedMaintenanceAction, maintenanceState]) => {
    return this.httpClient.put(maintenanceAPI +'/'+ reOpenedMaintenanceAction.payload.id + '/open', maintenanceState.requests).pipe(
      map(() => new MaintenanceActions.ReOpenMaintenanceSuccess()),
    )
   }),catchError((errorRespone) => {
      return of(new MaintenanceActions.LoadMaintenancesFailure(errorRespone));
   }));


  constructor(private actions$: Actions<MaintenanceActions.MaintenanceActions>, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) {}

}