import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
