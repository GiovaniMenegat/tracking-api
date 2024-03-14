import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { PackagesRepository } from './repositories/packages.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService, PackagesRepository, PrismaService],
})
export class PackagesModule {}
