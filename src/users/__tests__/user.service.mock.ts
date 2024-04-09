import { CreateUserMock } from 'src/auth/__tests__/auth.service.mock';
import { PrismaService } from 'src/prisma/prisma.service';

export const PrismaUserMock = {
  provide: PrismaService,
  useValue: {
    user: {
      delete: jest.fn().mockReturnValue(CreateUserMock),
    },
  },
};
