import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserMock, PrismaAuthMock } from './auth.service.mock';
import { signInMock } from './auth.controller.mock';
import * as bcrypt from 'bcrypt';
import { ForbiddenException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: PrismaService;
  let authRepository: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [AuthService, AuthRepository, PrismaService, PrismaAuthMock],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should create a user', async () => {
    const result = await authService.signupLocal(CreateUserMock);

    expect(prisma.user.create).toHaveBeenCalled();
    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('refresh_token');
  });

  describe('SignIn service', () => {
    it('should signin a user', async () => {
      const bcryptCompareSuccess = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompareSuccess;

      const result = await authService.signinLocal(signInMock);

      expect(prisma.user.findUnique).toHaveBeenCalled();
      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
    });

    it('should throw Access Denied when user not found', async () => {
      authRepository.signinLocal = jest.fn().mockResolvedValue(false);

      try {
        await authService.signinLocal({
          email: 'wrongEmail',
          password: 'pass',
        });
      } catch (error) {
        expect(error.message).toEqual('Access Denied');
        expect(error.status).toEqual(403);
      }
    });

    it('should throw Access Denied when incorrect password', async () => {
      const bcryptCompare = jest.fn().mockResolvedValue(false);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      try {
        await authService.signinLocal({
          email: 'email',
          password: 'wrodngPass',
        });
      } catch (error) {
        expect(error.message).toEqual('Access Denied');
        expect(error.status).toEqual(403);
      }
    });
  });

  describe('Logout service', () => {
    it('should logout a user', async () => {
      authRepository.logout = jest.fn().mockResolvedValue(true);

      await authService.logout(1);

      expect(authRepository.logout).toHaveBeenCalled();
    });
  });
});
