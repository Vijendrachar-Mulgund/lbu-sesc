import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupRequestObject {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  studentId: string;
}
