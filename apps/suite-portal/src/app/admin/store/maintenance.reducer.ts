import * as MaintenanceActions from './maintenance.actions';
import { MaintenanceRequest } from "@suiteportal/api-interfaces";


export interface MaintenanceState {
  maintenance: MaintenanceRequest;
  error: {error: string};
  requests: MaintenanceRequest[],
  closed: any[]
  success: string
}

export const initialState: MaintenanceState = {
  maintenance: {
    name: '',
    email: '',
    unitNumber: '',
    serviceType: null,
    summary: '',
    details: '',
  },
  error: null!,
  success: '',
  requests: [],
  closed: []
};

export function maintenanceReducer(state = initialState, action: MaintenanceActions.MaintenanceActions): MaintenanceState {
  switch (action.type) {
    case MaintenanceActions.MaintenanceActionTypes.LoadMaintenances:
      return {
         ...state
      };

    case MaintenanceActions.MaintenanceActionTypes.FetchMaintenance:
      return {
        ...state
      };  

    case MaintenanceActions.MaintenanceActionTypes.LoadMaintenancesSuccess:
      return {
         ...state,
         maintenance: {...action.payload},
         success: 'Maintenance Request has been added'
      };

    case MaintenanceActions.MaintenanceActionTypes.LoadMaintenancesFailure:
       return {
          ...state,
          maintenance: null!,
          error: action.payload,
        };

    case MaintenanceActions.MaintenanceActionTypes.AddMaintenance:
        return {
          ...state,
          maintenance: {...action.payload}
        };

    case MaintenanceActions.MaintenanceActionTypes.SetMaintenances:
        return {
          ...state,
          requests: [...action.payload],
        };
    
    case MaintenanceActions.MaintenanceActionTypes.CloseMaintenance:
      return {
        ...state,
        requests: state.requests.map((request, index) =>
          index === action.payload.index
            ? { ...request, close: true }
            : request
        )
      };

      case MaintenanceActions.MaintenanceActionTypes.CloseMaintenanceSuccess:
        return {
          ...state
        }

    case MaintenanceActions.MaintenanceActionTypes.ReOpenMaintenance:
      return {
        ...state,
        requests: state.requests.map((request, index) =>
          index === action.payload.index
            ? { ...request, close: true }
            : request
        )
      }
      
    case MaintenanceActions.MaintenanceActionTypes.ReOpenMaintenanceSuccess:
      return {
        ...state
      }  

    default:
         return state;
  }
}