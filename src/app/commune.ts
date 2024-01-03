import { wilaya } from "./wilaya";

export interface Commune {
  nom: string;
  coordonneeX: number;
  coordonneeY: number;
  wilaya: wilaya; 
}
