import { Test, TestingModule } from '@nestjs/testing';
import { PackagesService } from '../packages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PackagesRepository } from '../repositories/packages.repository';

describe('PackagesService', () => {
  let service: PackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackagesService, PackagesRepository, PrismaService],
    }).compile();

    service = module.get<PackagesService>(PackagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
