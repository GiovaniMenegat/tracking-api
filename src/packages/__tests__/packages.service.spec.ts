import { Test, TestingModule } from '@nestjs/testing';
import { PackagesService } from '../packages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PackagesRepository } from '../repositories/packages.repository';
import {
  FindAllPackagesByUserResponse,
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

  describe('findAllPackagesByUser service', () => {
    it('should return all packages by user', async () => {
      prisma.user.findUnique = jest
        .fn()
        .mockResolvedValue(FindAllPackagesByUserResponse);

      const result = await packagesService.findAllPackagesByUser(1);

      expect(prisma.user.findUnique).toHaveBeenCalled();
      expect(result).toEqual(FindAllPackagesByUserResponse);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        select: {
          username: true,
          email: true,
          packages: {
            select: {
              trackingNumber: true,
            },
          },
        },
      });
    });

    it('should return User not found when user not found', async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(false);

      try {
        await packagesService.findAllPackagesByUser(1);
      } catch (error) {
        expect(error.message).toEqual('User not found');
        expect(error.status).toEqual(404);
      }
    });
  });

  // describe('getTrack service', () => {
  //   it('should return track of a single package', async () => {
  //     // jest.spyOn(trackMethod, 'trackNumber').mockImplementation(() => ({ someObjectProperty: 42 }));
  //     trackNumber = jest.fn().mockReturnValue(getTrackMock);

  //     // trackNumber()

  //     const result = await packagesService.getTrack(
  //       createPackageDto.trackingNumber,
  //     );

  //     expect(result).toEqual(getTrackMock);
  //   });
  // });

  describe('Update service', () => {
    it('should update a package', async () => {
      prisma.user.findUnique = jest
        .fn()
        .mockResolvedValue(FindAllPackagesByUserResponse);

      prisma.packages.update = jest.fn().mockReturnValue({
        id: 1,
        trackingNumber: 'newTrackingNumber',
        userId: 1,
      });

      const result = await packagesService.update(1, 1, {
        trackingNumber: 'newTrackingNumber',
      });

      expect(prisma.user.findUnique).toHaveBeenCalled();
      expect(prisma.packages.update).toHaveBeenCalled();
      expect(result).toEqual({
        id: 1,
        trackingNumber: 'newTrackingNumber',
        userId: 1,
      });
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(prisma.packages.update).toHaveBeenCalledWith({
        data: {
          ...{
            trackingNumber: 'newTrackingNumber',
          },
          user: {
            connect: {
              id: 1,
            },
          },
        },
        where: {
          id: 1,
        },
      });
    });

    it('should return User not found when user not found', async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(false);

      try {
        await packagesService.update(1, 1, {
          trackingNumber: 'newTrackingNumber',
        });
      } catch (error) {
        expect(error.message).toEqual('User not found');
        expect(error.status).toEqual(404);
      }
    });
  });

  describe('Delete service', () => {
    it('should delete a package', async () => {
      await packagesService.remove(1);

      expect(prisma.packages.delete).toHaveBeenCalled();
      expect(prisma.packages.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
