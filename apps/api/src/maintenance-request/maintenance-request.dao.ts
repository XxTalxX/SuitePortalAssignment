import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  submittedAt: Date;
}

export interface MaintenanceRequestData {
  requests: MaintenanceRequestDB[];
}

const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json')
const db = low(adapter)


db.defaults({ requests: [] }).write();

@Injectable()
export class MaintenanceRequestDao {

  private get collection(): any {
    return db.get('requests');

  }

  constructor() {
    //
  }

  async insertNewRequest(maintenanceRequest: MaintenanceRequest) {
    const id = { id: nanoid.nanoid(10) };
    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        submittedAt: new Date(),
      })
      .write()
    return id;
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.collection.find({ id }).value();
  }

  async getMaintenanceRequests(): Promise<MaintenanceRequestDB>{
    return await this.collection.value();
  }

  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.collection.chain().find({id: id}).assign({close: true}).write();
  }

  async reOpenMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.collection.chain().find({id: id}).assign({close: false}).write();
  }
}
