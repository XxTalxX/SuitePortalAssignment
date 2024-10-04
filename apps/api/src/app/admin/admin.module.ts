import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminDao } from './admin.dao';
import { JwtService } from '@nestjs/jwt';
import { LoginGuard } from './login.guard';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminDao,
    JwtService,
    LoginGuard
  ],
})
export class AdminModule {}
