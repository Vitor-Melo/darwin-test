import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  document: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsDateString()
  birthDate: string;
}
