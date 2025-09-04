import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  username?: string;
  password?: string;
  nickname?: string;
  avatar?: string;
  roles?: string;
}
