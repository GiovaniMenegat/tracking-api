import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePackageDto } from '../dto/create-package.dto';
import { PackageEntity } from '../entities/package.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { Prisma } from '@prisma/client';

@Injectable()
export class PackagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPackageDto: CreatePackageDto,
    userId: number,
  ): Promise<PackageEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const data: Prisma.PackagesCreateInput = {
      ...createPackageDto,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    const newPackage = await this.prisma.packages.create({
      data,
    });

    return newPackage;
  }
}
