import { Utilisateur } from "./utilisateur";

export interface Trajet {
  chauffeur:Utilisateur; 
  lieuDepart: string;
  lieuArrivee: string;
  dateDepart: Date;
  heureDepart: string;
  nbrPlaceMax: number;
  hebdomadaire: boolean;
}
