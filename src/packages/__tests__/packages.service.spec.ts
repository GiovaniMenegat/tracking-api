import { Test, TestingModule } from '@nestjs/testing';
import { PackagesService } from '../packages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PackagesRepository } from '../repositories/packages.repository';
import {
  PrismaPackagesMock,
  createPackageDto,
  packageEntityMock,
} from './packages.service.mock';

describe('PackagesService', () => {
  let packagesService: PackagesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackagesService,
        PackagesRepository,
        PrismaService,
        PrismaPackagesMock,
      ],
    }).compile();

    packagesService = module.get<PackagesService>(PackagesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(packagesService).toBeDefined();
  });

  describe('Create service', () => {
    it('should create a package', async () => {
      const result = await packagesService.create(createPackageDto, 1);

      expect(prisma.user.findUnique).toHaveBeenCalled();
      expect(prisma.packages.create).toHaveBeenCalled();
      expect(result).toEqual(packageEntityMock);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(prisma.packages.create).toHaveBeenCalledWith({
        data: {
          ...createPackageDto,
          user: {
            connect: {
              id: 1,
            },
          },
        },
      });
    });

    it('should return User not found when user not found', async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(false);

      try {
        await packagesService.create(createPackageDto, 1);
      } catch (error) {
        expect(error.message).toEqual('User not found');
        expect(error.status).toEqual(404);
      }
    });
  });
});
