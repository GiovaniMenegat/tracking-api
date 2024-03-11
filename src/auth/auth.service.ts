import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signupLocal(authDto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(authDto.password);
    const newUser = this.prisma.user.create({
      data: {
        username: authDto.username,
        email: authDto.email,
        hash,
      },
    });
  }

  signinLocal() {}

  logout() {}

  refreshTokens() {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}