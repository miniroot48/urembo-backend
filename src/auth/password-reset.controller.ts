import { Controller, Post, Body, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class RequestPasswordResetDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class VerifyOTPDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 128)
  newPassword: string;
}

@Controller('auth/password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('request')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(@Body() requestPasswordResetDto: RequestPasswordResetDto) {
    return this.passwordResetService.requestPasswordReset(requestPasswordResetDto.email);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOTP(@Body() verifyOTPDto: VerifyOTPDto) {
    return this.passwordResetService.verifyOTP(verifyOTPDto.email, verifyOTPDto.otp);
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordResetService.verifyOTPAndResetPassword(
      resetPasswordDto.email,
      resetPasswordDto.otp,
      resetPasswordDto.newPassword,
    );
  }
}
