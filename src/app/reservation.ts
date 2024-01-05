import { Trajet } from "./trajet";
import { Utilisateur } from "./utilisateur";


export interface Reservation {
  Passagere: Utilisateur; 
  Trajet: Trajet; 
  approuvé : boolean;
}
