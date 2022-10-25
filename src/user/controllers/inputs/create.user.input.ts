import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  cpf: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  birthDate: string;
}
