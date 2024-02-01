import { Utilisateur } from "./utilisateur";

export interface Trajet {
    id:number;
    Chauffeur:number; 
  Lieu_depart: number;
  Lieu_arrive: number;
  Date_depart: string;
  Heure_depart: string;
  nbr_place: number;
  hebdomadaire: number;
}
