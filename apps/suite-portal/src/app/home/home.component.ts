import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ALL_SERVICE_TYPES, MaintenanceRequest, ServiceType } from '@suiteportal/api-interfaces';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../reducers/index';
import * as maintenanceActions from '../admin/store/maintenance.actions';


@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serviceTypes = ALL_SERVICE_TYPES;
  form: FormGroup;
  maintenanceRequest: MaintenanceRequest = {
    name: '',
    email: '',
    unitNumber: '',
    serviceType: ServiceType.General,
    summary: '',
    details: ''
  };
  maintenanceSubscription: Subscription;
  errorMessage: {error: string};
  successMessage: string;


  constructor(public formBuilder: FormBuilder, private store: Store<fromApp.AppState>) {}

  onSubmit() {
    this.maintenanceRequest = {
      name: this.form.get('name').value,
      unitNumber: this.form.get('unitNumber').value,
      email: this.form.get('email').value,
      serviceType: this.form.get('serviceType').value,
      summary: this.form.get('summary').value,
      details: this.form.get('details').value,   
    }
    this.store.dispatch(new maintenanceActions.AddMaintenance(this.maintenanceRequest));
    if(!this.errorMessage) {
    this.form.reset();
    }
  };

  ngOnInit(): void {
      this.form = new FormGroup({
        'unitNumber': new FormControl('', Validators.required),
        'name': new FormControl('', Validators.required),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'serviceType': new FormControl('', Validators.required),
        'summary': new FormControl('',Validators.required),
        'details': new FormControl('', Validators.maxLength(500))
      });
  
       this.maintenanceSubscription = this.store.select('maintenance').subscribe((maintenanceState) => {
          this.maintenanceRequest = maintenanceState.maintenance;
          this.errorMessage = maintenanceState.error;
          this.successMessage = maintenanceState.success;
          if(this.successMessage) {
            this.errorMessage = null;
          }
      });
     
  }

  ngOnDestroy(): void {
    if(this.maintenanceSubscription) {
      this.maintenanceSubscription.unsubscribe();
    }
  }

}
