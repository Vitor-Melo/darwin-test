import { Types } from '../enums/assist.types.enum';
import { Address } from './address.aggregate.entity';

export class Assist {
  id: string;

  userDocument: string;

  createdAt: string;

  latitude: number;

  longitude: number;

  address: Address;

  type: Types;

  status: boolean;
}
