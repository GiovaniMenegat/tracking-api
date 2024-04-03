import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../users.service';
import * as Chance from 'chance';

const chance = new Chance();

export const UserMock = {
  id: 1,
  email: chance.email(),
  username: chance.name(),
  hash: chance.string(),
  hashRt: chance.string(),
} as UserEntity;

export const UsersServiceMock = {
  provide: UsersService,
  useValue: {
    update: jest.fn().mockResolvedValue(UserMock),
    remove: jest.fn().mockResolvedValue(UserMock),
  },
};
