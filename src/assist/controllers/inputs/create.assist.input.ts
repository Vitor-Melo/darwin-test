import { IsEnum, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { Types } from 'src/assist/enums/assist.types.enum';

interface Address {
  street?: string | null;
  number?: string | null;
  neighborhood?: string | null;
  postalCode?: string | null;
  city?: string | null;
  state?: string | null;
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
  address: Address;

  @IsEnum(Types)
  type: Types;
}
