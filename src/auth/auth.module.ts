import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategies';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    PrismaService,
    UsersRepository,
  ],
})
export class AuthModule {}
