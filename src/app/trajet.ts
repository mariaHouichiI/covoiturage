import { Utilisateur } from "./utilisateur";

export interface Trajet {
    id_trajet:number;
    Chauffeur:Utilisateur; 
  Lieu_depart: string;
  Lieu_arrive: string;
  Date_depart: Date;
  Heur_depart: string;
  NbR_place_max: number;
  hebdomadaire: boolean;
}
