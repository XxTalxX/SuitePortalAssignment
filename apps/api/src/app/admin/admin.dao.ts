import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Injectable } from '@nestjs/common';
import { MaintenanceRequestDB } from '../../maintenance-request/maintenance-request.dao';

const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json');
const db = low(adapter);

db.defaults({ admins: [] }).write();

@Injectable()
export class AdminDao {
  private get adminsCollection(): any {
    return db.get('admins');
  }

  async findOneByEmail(email: string): Promise<MaintenanceRequestDB | undefined> {
    return this.adminsCollection.find({ email }).value();
  }

  async comparePassword(admin: any, password: string): Promise<boolean> {
    /* 
    would use bycrypt in real application, for storing new password:
    bcrypt.hash(password, 10).then(hash => {
    const admin = new Admin({
      email: admin.email,
      password: hash
    }); ... store in lowdb.....
    and for compare: 
    bcrypt.compare(password, admin.password)
    */
    return admin["password"] === password;

  }
}