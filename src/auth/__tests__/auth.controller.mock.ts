import { AuthService } from '../auth.service';
import { SignupDto } from '../dto/signup.dto';
import * as Chance from 'chance';
import { Tokens } from '../types';
import { SigninDto } from '../dto/signin.dto';

const chance = new Chance();

export const signUpMock = {
  username: chance.name(),
  email: chance.email(),
  password: chance.string(),
} as SignupDto;

export const signInMock = {
  email: chance.email(),
  password: chance.string(),
} as SigninDto;

export const tokensMock = {
  access_token: chance.string(),
  refresh_token: chance.string(),
} as Tokens;

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    signupLocal: jest.fn().mockResolvedValue(tokensMock),
    signinLocal: jest.fn().mockResolvedValue(tokensMock),
    logout: jest.fn().mockResolvedValue(true),
    refreshTokens: jest.fn().mockResolvedValue(tokensMock),
  },
};
