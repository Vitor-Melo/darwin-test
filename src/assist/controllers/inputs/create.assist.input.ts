import { IsNotEmpty, IsObject } from 'class-validator';

interface Address {
  street?: string | null;
  neighborhood?: string | null;
  postalCode?: string | null;
  city?: string | null;
  state?: string | null;
}

export class CreateAssistInput {
  @IsNotEmpty()
  userDocument: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  @IsObject()
  address: Address;

  @IsNotEmpty()
  type: string;
}
