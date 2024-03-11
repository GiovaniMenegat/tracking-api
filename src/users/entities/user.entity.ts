import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  username: string;
  email: string;
  hash: string;
  hashRt: string;
}
