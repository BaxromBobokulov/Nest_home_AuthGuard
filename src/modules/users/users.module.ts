import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[
    JwtModule.register({
        global:true,
        secret:"shaftoli",
        signOptions:{
          expiresIn:'1h'
        }
      })]
})
export class UsersModule {

}
