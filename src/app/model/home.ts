import { Ingredient } from './ingredient';
import { Post } from './post';
import { Recipe } from './recipe';

export interface Home {
  id: number;
  name: string;
  posts: Post[];
  recipes: Recipe[];
  ingredients: Ingredient[];
  isDeleted: boolean;
}
