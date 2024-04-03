import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UserMock, UsersServiceMock } from './users.controller.mock';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersServiceMock],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should update a user', async () => {
    const result = await usersController.update(1, UserMock);
    expect(result.email).toEqual(UserMock.email);
    expect(result.username).toEqual(UserMock.username);
    expect(result.hashRt).toEqual(UserMock.hashRt);
    expect(result.hash).toEqual(UserMock.hash);
  });

  it('should remove a user', async () => {
    const result = await usersController.remove(1);
    expect(result).toEqual(UserMock);
  });
});
