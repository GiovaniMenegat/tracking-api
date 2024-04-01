import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import * as Chance from 'chance';
import { SignupDto } from '../dto/signup.dto';
import {
  authServiceMock,
  signUpMock,
  tokensMock,
} from './auth.controller.mock';

describe('AuthController', () => {
  const chance = new Chance();
  let authController: AuthController;
  let signupDto: SignupDto;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  beforeEach(async () => {
    signupDto = {
      username: chance.name(),
      email: chance.email(),
      password: chance.string(),
    };
    // await prismaService.user.deleteMany();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should signUp user', async () => {
    const result = await authController.signupLocal(signUpMock);
    expect(result.access_token).toEqual(tokensMock.access_token);
    expect(result.refresh_token).toEqual(tokensMock.refresh_token);
  });
});
