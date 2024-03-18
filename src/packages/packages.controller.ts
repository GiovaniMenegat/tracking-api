import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  create(
    @Body() createPackageDto: CreatePackageDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.packagesService.create(createPackageDto, userId);
  }

  @Get()
  findAllPackagesByUser(@GetCurrentUserId() userId: number) {
    return this.packagesService.findAllPackagesByUser(userId);
  }

  @Get(':trackingNumber')
  getTrack(@Param('trackingNumber') trackingNumber: string) {
    return this.packagesService.getTrack(trackingNumber);
  }

  @Patch(':id')
  update(
    @GetCurrentUserId() userId: number,
    @Param('id') packageId: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    return this.packagesService.update(userId, +packageId, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(+id);
  }
}
