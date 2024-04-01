import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import {
  authServiceMock,
  signInMock,
  signUpMock,
  tokensMock,
} from './auth.controller.mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should signUp user', async () => {
    const result = await authController.signupLocal(signUpMock);
    expect(result.access_token).toEqual(tokensMock.access_token);
    expect(result.refresh_token).toEqual(tokensMock.refresh_token);
  });

  it('should signIn user', async () => {
    const result = await authController.signinLocal(signInMock);
    expect(result.access_token).toEqual(tokensMock.access_token);
    expect(result.refresh_token).toEqual(tokensMock.refresh_token);
  });

  it('should logout user', async () => {
    const result = await authController.logout(1);
    expect(result).toBeTruthy();
  });
});
