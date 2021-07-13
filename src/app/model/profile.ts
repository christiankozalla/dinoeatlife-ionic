export interface Profile {
  name: string;
  bio?: string;
  city?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    github?: string;
    website?: string;
  }
}