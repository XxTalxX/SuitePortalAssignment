import { Module } from '@nestjs/common';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MaintenanceRequestDao } from './maintenance-request.dao';
import { MaintenanceRequestService } from './maintenance-request.service';
import { JwtService } from '@nestjs/jwt';
import { LoginGuard } from '../app/admin/login.guard';


@Module({
  imports: [],
  controllers: [MaintenanceRequestController],
  providers: [
    MaintenanceRequestService,
    MaintenanceRequestDao,
    JwtService,
    LoginGuard
  ],
})
export class MaintenanceRequestModule {}
