import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Types } from '../../enums/assist.types.enum';

export class Address {
  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  postalCode: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;
}

export class CreateAssistInput {
  @IsNotEmpty()
  userDocument: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsEnum(Types)
  type: Types;
}
