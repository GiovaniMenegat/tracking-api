import { PackageEntity } from '../entities/package.entity';
import { PackagesService } from '../packages.service';
import * as Chance from 'chance';
import { findAllPackagesByUserResponse } from '../types/packages.interface';
import { GetTrackResponse } from 'src/services/types/linkAndTrack.interface';
import { CreatePackageDto } from '../dto/create-package.dto';

const chance = new Chance();

const trackingNumber = chance.string();

export const CreatePackageMock = {
  trackingNumber,
} as CreatePackageDto;

export const PackageMock = {
  id: 1,
  trackingNumber,
  userId: 1,
} as PackageEntity;

export const findAllPackagesByUserMock = {
  email: chance.email(),
  username: chance.name(),
  packages: [
    {
      trackingNumber: chance.string(),
    },
    {
      trackingNumber: chance.string(),
    },
  ],
} as findAllPackagesByUserResponse;

export const getTrackMock = {
  code: trackingNumber,
  host: chance.string(),
  lastEvent: chance.date(),
  quantity: chance.integer({ min: 1, max: 5 }),
  service: chance.string(),
  time: chance.integer({ min: 1, max: 5 }),
  events: [
    {
      date: chance.date(),
      location: chance.string(),
      status: chance.string(),
    },
  ],
} as GetTrackResponse;

export const PackagesServiceMock = {
  provide: PackagesService,
  useValue: {
    create: jest.fn().mockResolvedValue(PackageMock),
    findAllPackagesByUser: jest
      .fn()
      .mockResolvedValue(findAllPackagesByUserMock),
    getTrack: jest.fn().mockResolvedValue(getTrackMock),
    update: jest.fn().mockResolvedValue(PackageMock),
    remove: jest.fn().mockResolvedValue(true),
  },
};
