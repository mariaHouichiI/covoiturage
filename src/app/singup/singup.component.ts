import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InsererService } from 'src/app/inserer.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {


  utilisateurData = {
    mat: '',
    nom: '',
    prenom: '',
    email: '',
    psw: '',
    tlf: '',
    role: 'false'  // Vous pouvez changer cela en fonction de votre logique
  };
  confirmpass: string | undefined;

  constructor(private router: Router, private insererService: InsererService) {}

  // Dans votre composant Angular
  inscrireUtilisateur(): void {
    if (this.utilisateurData.psw !== this.confirmpass) {
        console.log('Les mots de passe ne correspondent pas');
        return;
    }

    this.insererService.inscrireUtilisateur(this.utilisateurData).subscribe(
        response => {
            console.log(response);

            if (response.success) {
                // Succès : redirigez ou effectuez d'autres actions nécessaires
                this.router.navigate(['/chauffeur']); // Redirection vers la page d'accueil, ajustez si nécessaire
            } else {
                // Échec : affichez le message d'erreur
                console.error(response.message);
            }
        },
        error => {
            console.error(error);
        }
    );
}
Gotologin() {
  this.router.navigate(["/login"])}
}
