import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({
    description: 'Tracking code',
  })
  @IsString()
  @IsNotEmpty()
  trackingNumber: string;
}
