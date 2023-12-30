import { Trajet } from "./trajet.module";
import { Utilisateur } from "./utilisateur.module";


export interface Reservation {
  passager: Utilisateur; 
  trajet: Trajet; 
  approuvé : boolean;
}
