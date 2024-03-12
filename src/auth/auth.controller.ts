import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Tokens } from './types';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() signupDto: SignupDto): Promise<Tokens> {
    return this.authService.signupLocal(signupDto);
  }

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() signinDto: SigninDto): Promise<Tokens> {
    return this.authService.signinLocal(signinDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user;

    return this.authService.logout(user['id']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens() {
    // return this.authService.refreshTokens();
  }
}
