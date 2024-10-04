import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './create-admin.dto';
import { AdminDao } from './admin.dao';
import { JwtService} from '@nestjs/jwt'


@Injectable()
export class AdminService {
  constructor(private readonly adminDao: AdminDao, private jwtService: JwtService) {}

  async validateAdmin(loginDto: CreateAdminDto): Promise<any> {
  
    const admin = await this.adminDao.findOneByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.adminDao.comparePassword(admin, loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { email: admin.email, id: admin.id }; 

     return {
       idToken: this.jwtService.sign(
         payload,
         {
          secret: 'secret_should_have_value',
          expiresIn: '3600s'   
         }
       ),
       email: admin.email,
       localId: admin.id,
       expiresIn: 3600
     };
  }
}