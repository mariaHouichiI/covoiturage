
export interface Utilisateur {
  Matrecule: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Telephone: string;
  Password: string;
  Role: 'chauffeur' | 'passager';
}
