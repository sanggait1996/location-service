import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain uppercase, lowercase, number/special character',
  })
  password: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  role?: number;
}
