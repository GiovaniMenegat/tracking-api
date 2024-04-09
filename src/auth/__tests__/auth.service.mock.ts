import { UserEntity } from 'src/users/entities/user.entity';
import * as Chance from 'chance';
import { SignupDto } from '../dto/signup.dto';
import { Tokens } from '../types';
import { PrismaService } from 'src/prisma/prisma.service';

const chance = new Chance();

export const UserEntityMock = {
  id: 1,
  email: chance.email(),
  username: chance.name(),
  hash: chance.string(),
  hashRt: chance.string(),
} as UserEntity;

export const CreateUserMock = {
  username: chance.name(),
  email: chance.email(),
  password: chance.string(),
} as SignupDto;

export const ReturnCreateUserMock = {
  access_token: chance.string(),
  refresh_token: chance.string(),
} as Tokens;

export const PrismaAuthMock = {
  provide: PrismaService,
  useValue: {
    user: {
      create: jest.fn().mockReturnValue(CreateUserMock),
      findUnique: jest.fn().mockReturnValue(UserEntityMock),
      updateMany: jest.fn().mockReturnValue(UserEntityMock),
      update: jest.fn().mockReturnValue(UserEntityMock),
    },
  },
};
