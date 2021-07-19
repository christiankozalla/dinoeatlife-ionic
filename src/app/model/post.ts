import { Home } from './home';
import { Profile } from './profile';
import { User } from './user';

export interface Post extends Profile {
  id: number;
  content: string;
  createdAt: string;
  userId: User['id'];
  homeId: Home['id'];
}
