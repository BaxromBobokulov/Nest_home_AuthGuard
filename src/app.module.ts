import { Module } from '@nestjs/common';
import { PrismaModule } from './core/database/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), UsersModule, AuthModule,
],
  controllers: [UsersController],
  providers: [UsersService],
})

export class AppModule { }
