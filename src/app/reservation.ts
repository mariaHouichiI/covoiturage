import { Trajet } from "./trajet";
import { Utilisateur } from "./utilisateur";


export interface Reservation {
  passager: Utilisateur; 
  trajet: Trajet; 
  approuvé : boolean;
}
