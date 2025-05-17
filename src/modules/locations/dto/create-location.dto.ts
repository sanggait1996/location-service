import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsNotEmpty()
  @IsNumber()
  lat1: number;

  @IsNotEmpty()
  @IsNumber()
  long1: number;

  @IsNotEmpty()
  @IsNumber()
  lat2: number;

  @IsNotEmpty()
  @IsNumber()
  long2: number;
}
