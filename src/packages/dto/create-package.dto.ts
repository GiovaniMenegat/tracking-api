import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  trackingNumber: string;
}
