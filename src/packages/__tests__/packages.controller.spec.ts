import { Test, TestingModule } from '@nestjs/testing';
import { PackagesController } from '../packages.controller';
import {
  CreatePackageMock,
  PackageMock,
  PackagesServiceMock,
  findAllPackagesByUserMock,
  getTrackMock,
} from './packages.controller.mock';

describe('PackagesController', () => {
  let packagesController: PackagesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagesController],
      providers: [PackagesServiceMock],
    }).compile();

    packagesController = module.get<PackagesController>(PackagesController);
  });

  it('should be defined', () => {
    expect(packagesController).toBeDefined();
  });

  it('should create a new package', async () => {
    const result = await packagesController.create(CreatePackageMock, 1);
    expect(result.id).toEqual(PackageMock.id);
    expect(result.trackingNumber).toEqual(PackageMock.trackingNumber);
    expect(result.userId).toEqual(PackageMock.userId);
  });

  it('should find all packages by user', async () => {
    const result = await packagesController.findAllPackagesByUser(1);
    expect(result.email).toEqual(findAllPackagesByUserMock.email);
    expect(result.username).toEqual(findAllPackagesByUserMock.username);
    expect(result.packages).toEqual(findAllPackagesByUserMock.packages);
  });

  it('should get single track', async () => {
    const result = await packagesController.getTrack(
      CreatePackageMock.trackingNumber,
    );
    expect(result.code).toEqual(getTrackMock.code);
    expect(result.events).toEqual(getTrackMock.events);
    expect(result.service).toEqual(getTrackMock.service);
  });

  it('should update a tracking', async () => {
    const result = await packagesController.update(1, 1, PackageMock);
    expect(result.id).toEqual(PackageMock.id);
    expect(result.trackingNumber).toEqual(PackageMock.trackingNumber);
    expect(result.userId).toEqual(PackageMock.userId);
  });

  it('should remove a tracking package', async () => {
    const result = await packagesController.remove(1);
    expect(result).toBeTruthy();
  });
});
