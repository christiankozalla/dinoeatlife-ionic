import { Profile } from './profile';

export interface User {
  id: number;
  homeId: number;
  email: string;
  profile?: Profile;
  isVerified: boolean;
}
