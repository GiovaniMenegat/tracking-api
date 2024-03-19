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
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @ApiCreatedResponse({ description: 'Created' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Access Denied' })
  @Post()
  create(
    @Body() createPackageDto: CreatePackageDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.packagesService.create(createPackageDto, userId);
  }

  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Access Denied' })
  @Get()
  findAllPackagesByUser(@GetCurrentUserId() userId: number) {
    return this.packagesService.findAllPackagesByUser(userId);
  }

  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Access Denied' })
  @Get(':trackingNumber')
  getTrack(@Param('trackingNumber') trackingNumber: string) {
    return this.packagesService.getTrack(trackingNumber);
  }

  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Access Denied' })
  @Patch(':id')
  update(
    @GetCurrentUserId() userId: number,
    @Param('id') packageId: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    return this.packagesService.update(userId, +packageId, updatePackageDto);
  }

  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Access Denied' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(+id);
  }
}
