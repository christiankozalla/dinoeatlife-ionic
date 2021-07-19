import { Recipe } from './recipe';
import { Home } from './home';

export interface Ingredient {
  id: number;
  name: string;
  unit: string;
  recipes: Recipe[];
  homeId: Home['id'];
  isDeleted: boolean;
}
