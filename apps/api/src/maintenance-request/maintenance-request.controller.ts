import { BadRequestException, Body, Controller, Post, Get, Param, Put, UseGuards } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';
//import { LoginGuard } from '../app/admin/login.guard';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest,
  ) {
    if (!maintenanceRequest?.name) {
      throw new BadRequestException('Must provide a valid name');
    }
    if (!maintenanceRequest?.unitNumber) {
      throw new BadRequestException('Must provide a valid unit number');
    }
    if (!maintenanceRequest?.email) {
      throw new BadRequestException('Must provide a valid email');
    }
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
 
    maintenanceRequest["close"] = false;
    return await this.maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
  }
  //@UseGuards(LoginGuard)
  @Get('/')
  public async getMaintenanceRequests() {
    return await this.maintenanceRequestService.getMaintenanceRequests();
  }  

  //@UseGuards(LoginGuard)
  @Get('/:id')
  public async getMaintenanceRequest(
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }

  //@UseGuards(LoginGuard)
  @Put('/:id/close')
  public async closeMaintenanceRequest(
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.closeMaintenanceRequest(id);
  }

    //@UseGuards(LoginGuard)
    @Put('/:id/open')
    public async reOpenMaintenanceRequest(
      @Param('id') id: string,
    ) {
      if (!id) {
        throw new BadRequestException('No id provided');
      }
      return await this.maintenanceRequestService.reOpenMaintenanceRequest(id);
    }
}
