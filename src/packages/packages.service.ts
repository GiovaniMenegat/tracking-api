import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackagesRepository } from './repositories/packages.repository';
import { trackNumber } from 'src/services/linkAndTrack/linkAndTrack.service';
import { GetTrackResponse } from 'src/services/types/linkAndTrack.interface';

@Injectable()
export class PackagesService {
  constructor(private readonly packagesRepository: PackagesRepository) {}

  create(createPackageDto: CreatePackageDto, userId: number) {
    return this.packagesRepository.create(createPackageDto, userId);
  }

  findAll() {
    return `This action returns all packages`;
  }

  async getTrack(trackingNumber: string): Promise<GetTrackResponse> {
    const track = await trackNumber(trackingNumber);

    return track;
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
