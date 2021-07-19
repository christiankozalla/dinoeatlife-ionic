import { Ingredient } from './ingredient';
import { Post } from './post';
import { Recipe } from './recipe';

export interface Home {
  id: number;
  posts: Post[];
  recipes: Recipe[];
  ingredients: Ingredient[];
}
