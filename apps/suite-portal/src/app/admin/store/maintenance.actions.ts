import { Action } from '@ngrx/store';
import { MaintenanceRequest } from "@suiteportal/api-interfaces";

export enum MaintenanceActionTypes {
  LoadMaintenances = '[Maintenance] Load Maintenances',
  LoadMaintenancesSuccess = '[Maintenance] Load Maintenances Success',
  LoadMaintenancesFailure = '[Maintenance] Load Maintenances Failure',
  AddMaintenance = '[Maintenance] Add Maintenance',
  FetchMaintenance =  '[Maintenance] Fetch Maintenances',
  SetMaintenances = '[Maintenance] Set Maintenances',
  CloseMaintenance = '[Maintenance] Close Maintenances',
  CloseMaintenanceSuccess = '[Maintenance] Close Maintenance Success',
  ReOpenMaintenance = '[Maintenance] ReOpen Maintenance',
  ReOpenMaintenanceSuccess = '[Maintenance] ReOpen Maintenance Success'
}


export class AddMaintenance implements Action {
  readonly type = MaintenanceActionTypes.AddMaintenance;
  constructor(public payload: MaintenanceRequest) {}
}

export class LoadMaintenances implements Action {
  readonly type = MaintenanceActionTypes.LoadMaintenances;
}

export class LoadMaintenancesSuccess implements Action {
  readonly type = MaintenanceActionTypes.LoadMaintenancesSuccess;
  constructor(public payload: MaintenanceRequest ) { }
}

export class LoadMaintenancesFailure implements Action {
  readonly type = MaintenanceActionTypes.LoadMaintenancesFailure;
  constructor(public payload: { error: any }) { }
}

export class FetchMaintenance implements Action {
    readonly type = MaintenanceActionTypes.FetchMaintenance;
    constructor(public payload: string) {}
}

export class SetMaintenances implements Action {
    readonly type = MaintenanceActionTypes.SetMaintenances;
    constructor(public payload: MaintenanceRequest[]) {}
}

export class CloseMaintenance implements Action {
  readonly type = MaintenanceActionTypes.CloseMaintenance;
  constructor(public payload: {index: number, id: string}) {}
}

export class CloseMaintenanceSuccess implements Action { 
  readonly type = MaintenanceActionTypes.CloseMaintenanceSuccess
}

export class ReOpenMaintenance implements Action {
  readonly type = MaintenanceActionTypes.ReOpenMaintenance;
  constructor(public payload: {index: number, id: string}) {}
}

export class ReOpenMaintenanceSuccess implements Action {
  readonly type = MaintenanceActionTypes.ReOpenMaintenanceSuccess;
}



export type MaintenanceActions = LoadMaintenances | LoadMaintenancesSuccess | 
LoadMaintenancesFailure | AddMaintenance | FetchMaintenance | SetMaintenances 
| CloseMaintenance | CloseMaintenanceSuccess | ReOpenMaintenance | ReOpenMaintenanceSuccess;