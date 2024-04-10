import { UserEntityMock } from 'src/auth/__tests__/auth.service.mock';
import { PrismaService } from 'src/prisma/prisma.service';
import { PackageEntity } from '../entities/package.entity';
import * as Chance from 'chance';
import { CreatePackageDto } from '../dto/create-package.dto';
import { findAllPackagesByUserResponse } from '../types/packages.interface';

const chance = new Chance();

const trackingNumber = chance.string();

export const packageEntityMock = {
  id: 1,
  trackingNumber,
  userId: 1,
} as PackageEntity;

export const createPackageDto = {
  trackingNumber,
} as CreatePackageDto;

export const FindAllPackagesByUserResponse = {
  email: chance.email(),
  username: chance.name(),
  packages: [
    {
      trackingNumber,
    },
  ],
} as findAllPackagesByUserResponse;

export const PrismaPackagesMock = {
  provide: PrismaService,
  useValue: {
    packages: {
      create: jest.fn().mockReturnValue(packageEntityMock),
      update: jest.fn().mockReturnValue(packageEntityMock),
      delete: jest.fn().mockResolvedValue(true),
    },
    user: {
      findUnique: jest.fn().mockReturnValue(FindAllPackagesByUserResponse),
    },
  },
};
