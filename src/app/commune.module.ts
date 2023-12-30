import { Wilaya } from "./wilaya.module";

export interface Commune {
  nom: string;
  coordonneeX: number;
  coordonneeY: number;
  wilaya: Wilaya; 
}
