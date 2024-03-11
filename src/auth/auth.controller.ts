import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/local/signup')
  signupLocal(@Body() authDto: AuthDto): Promise<Tokens> {
    this.authService.signupLocal(authDto);
  }

  @Post('/local/signin')
  signinLocal() {
    this.authService.signinLocal();
  }

  @Post('/logout')
  logout() {
    this.authService.logout();
  }

  @Post('/refresh')
  refreshTokens() {
    this.authService.refreshTokens();
  }
}
