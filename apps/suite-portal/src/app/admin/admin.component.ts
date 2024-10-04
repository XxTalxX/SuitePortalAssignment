import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../reducers/index';
import * as maintenanceActions from '../admin/store/maintenance.actions';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';


@Component({
  selector: 'sp-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  openMaintenanceColumns = ["unitNumber", "name", "email", "serviceType", "summary", "details", "action"];

  maintenanceRequests: MaintenanceRequest[];
  openMaintenances: any = [];
  maintenanceSubscription: Subscription;
  maintenanceRequest: MaintenanceRequest;
  errorMessage: {error: string};
  selectedMaintenance: any;
  selectedMaintenanceIndex: number;

  constructor(private store: Store<fromApp.AppState>) { }


  closeRequest(index: number, id: string) {
    this.store.dispatch(new maintenanceActions.CloseMaintenance({index: index,id: id}));
  }

  getMaintenance(index: number) {
    this.selectedMaintenanceIndex = index;
    this.selectedMaintenance = this.openMaintenances[this.selectedMaintenanceIndex];
    
  }

  reOpenRequest() {
    this.store.dispatch(new maintenanceActions.ReOpenMaintenance(
      {index: this.selectedMaintenanceIndex, id: this.selectedMaintenance.id}))
    this.closePopup();
    location.reload();
  }

  closePopup() {
    this.selectedMaintenance = null;
  }

 

  ngOnInit(): void {
    this.store.dispatch(new maintenanceActions.LoadMaintenances())
    this.maintenanceSubscription = this.store.select('maintenance').subscribe((maintenanceState) => {
      this.maintenanceRequest = maintenanceState.maintenance;
      this.errorMessage = maintenanceState.error;
      this.maintenanceRequests = maintenanceState.requests;
      this.openMaintenances = [...maintenanceState.requests];
  });
  }

  ngOnDestroy(): void {
    if(this.maintenanceSubscription) {
      this.maintenanceSubscription.unsubscribe();
    }
  }

}
