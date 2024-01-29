import { Utilisateur } from "./utilisateur";

export interface Trajet {
    id:number;
    chauffeur:number; 
  commune_depart: number;
  commune_arrive: number;
  date_depart: string;
  heure_depart: string;
  nbr_place: number;
  hebdomadaire: number;
 
}
