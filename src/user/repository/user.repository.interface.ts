import { User } from '../entity/user.entity';

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  getUserByDocument(userDocument: string): Promise<User>;
  getUserByPhone(phone: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
}
