import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersRepository } from '../repositories/users.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaUserMock } from './user.service.mock';
import { UserEntity } from '../entities/user.entity';
import { CreateUserMock } from 'src/auth/__tests__/auth.service.mock';

describe('UsersService', () => {
  let usersService: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository, PrismaService, PrismaUserMock],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('Update service', () => {
    it('should update a user', async () => {
      const updateUserMock = {
        username: 'newUsername',
      } as Partial<UserEntity>;

      prisma.user.update = jest.fn().mockReturnValue({
        ...CreateUserMock,
        username: updateUserMock.username,
      });

      const result = await usersService.update(1, updateUserMock);

      expect(result).toEqual({
        ...CreateUserMock,
        username: updateUserMock.username,
      });
      expect(prisma.user.update).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserMock,
      });
    });
  });

  describe('Delete service', () => {
    it('should delete a user', async () => {
      const result = await usersService.remove(1);

      expect(result).toEqual(CreateUserMock);
      expect(prisma.user.delete).toHaveBeenCalled();
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
