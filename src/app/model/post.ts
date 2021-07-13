import { Profile } from "./profile";

export interface Post extends Profile {
  content: string;
}