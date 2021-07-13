import { Profile } from './profile';
import { Post } from './post';
import { Recipe } from './recipe';

export interface State {
  profile: Profile;
  posts: Post[];
  recipes: Recipe[];
}
