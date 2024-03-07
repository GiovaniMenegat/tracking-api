import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PackagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
