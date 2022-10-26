import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserGetInput {
  @IsOptional()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsNotEmpty()
  document: string;
}
