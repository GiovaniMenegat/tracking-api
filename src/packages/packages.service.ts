import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackagesRepository } from './repositories/packages.repository';
import { trackNumber } from 'src/services/linkAndTrack/linkAndTrack.service';
import { GetTrackResponse } from 'src/services/types/linkAndTrack.interface';
import { findAllPackagesByUserResponse } from './types/packages.interface';
import { PackageEntity } from './entities/package.entity';

@Injectable()
export class PackagesService {
  constructor(private readonly packagesRepository: PackagesRepository) {}

  create(createPackageDto: CreatePackageDto, userId: number) {
    return this.packagesRepository.create(createPackageDto, userId);
  }

  findAllPackagesByUser(
    userId: number,
  ): Promise<findAllPackagesByUserResponse> {
    return this.packagesRepository.findAllPackagesByUser(userId);
  }

  async getTrack(trackingNumber: string): Promise<GetTrackResponse> {
    const track = await trackNumber(trackingNumber);

    return track;
  }

  update(
    userId: number,
    packageId: number,
    updatePackageDto: UpdatePackageDto,
  ): Promise<PackageEntity> {
    return this.packagesRepository.update(userId, packageId, updatePackageDto);
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
