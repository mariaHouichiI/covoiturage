
export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  password: string;
  role: 'chauffeur' | 'passager';
}