import {
    ActionReducerMap,
  } from '@ngrx/store';
  import { loginReducer , State} from '../login/store/login.reducer';
import { maintenanceReducer, MaintenanceState } from '../admin/store/maintenance.reducer';

  
  
  export interface AppState {
    login: State;
    maintenance: MaintenanceState;
  };
  
  export const reducers: ActionReducerMap<AppState, any> = {
    login: loginReducer,
    maintenance: maintenanceReducer
  };