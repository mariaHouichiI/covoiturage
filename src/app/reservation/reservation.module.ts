import { Trajet } from "../trajet/trajet.module";
import { Utilisateur } from "../utilisateur/utilisateur.module";


export interface Reservation {
  passager: Utilisateur; 
  trajet: Trajet; 
  approuvé : boolean;
}
