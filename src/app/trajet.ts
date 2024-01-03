import { Utilisateur } from "./utilisateur";

export interface Trajet {
    id_trajet:number;
  chauffeur:Utilisateur; 
  lieuDepart: string;
  lieuArrivee: string;
  dateDepart: Date;
  heureDepart: string;
  nbrPlaceMax: number;
  hebdomadaire: boolean;
}
