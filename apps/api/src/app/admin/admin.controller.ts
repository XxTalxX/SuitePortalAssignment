import { Controller, Post, Body, HttpException, HttpStatus, HttpCode, Header } from '@nestjs/common';
import { CreateAdminDto } from './create-admin.dto';
import { AdminService } from './admin.service';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  //@Header('authorization', '')
  async login(@Body() loginDto: CreateAdminDto) {
    const loginResult = await this.adminService.validateAdmin(loginDto);
    //Header('authorization', loginResult.idToken);
    if (!loginResult) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
    return loginResult;
  }
}