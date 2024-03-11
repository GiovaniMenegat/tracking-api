import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Tokens } from './types';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  signupLocal(@Body() signupDto: SignupDto): Promise<Tokens> {
    return this.authService.signupLocal(signupDto);
  }

  @Post('/local/signin')
  signinLocal(@Body() signinDto: SigninDto): Promise<Tokens> {
    return this.authService.signinLocal(signinDto);
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @Post('/refresh')
  refreshTokens() {
    return this.authService.refreshTokens();
  }
}
