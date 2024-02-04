import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { wilaya } from '../wilaya';
import { Commune } from '../commune';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms'; 
import { TrajetService } from '../trajet.service';
import { Trajet } from '../trajet';
import { WilayaCommuneService } from '../wilaya-commune.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { GetUserService } from '../get-user.service';
import { Utilisateur } from '../utilisateur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css']
})
export class ChauffeurComponent {

heureDepart!: Date;
  dateDepart!: Date;
  trajetUpdateDepart!: { Wilaya: string; Nom_Commune: string; id: number; };
trajetUpdateArrive!:{ Wilaya: string, Nom_Commune: string, id: number }
  trajetUpdate!: Trajet; 
  selectedcommune1!: Commune;
  selectedwilaya1!: wilaya;
  selectedcommune2!: Commune;
  selectedwilaya2!: wilaya;
  selectedcommune3!: Commune;
  selectedwilaya3!: wilaya;
  departs: { Wilaya: string, Nom_Commune: string, id: number }[] = [];
  arrives: { Wilaya: string, Nom_Commune: string, id: number }[] = [];
  communes1:Commune[] = [];
  communes2:Commune[] = [];
  communes3:Commune[] = [];
  wilayas: wilaya[] = [];
  trajets: Trajet[]=[];
  error = '';
  success = '';
  currentUser!: Utilisateur;
  deleteError: string | undefined;

constructor(private getUser :GetUserService,private router : Router,private datePipe: DatePipe, private authService: AuthService,private trajetService: TrajetService, private commune_wilayaServive: WilayaCommuneService) {
 
}

  
  styleOBJ = {
  borderRadius: '5px',
  border: '0.5px solid #DDD',
  background: '#FBFBFB',
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  'margin-left': '22%',
  'margin-right': '3%',
};

styledown = {'margin-bottom': '15%'};
  wialays!: wilaya[];
  value: string | undefined;
  selectedwilaya!: wilaya;
  wilayaDepart!: wilaya;
  wilayaArrivee!: wilaya;
  communeDepart!: Commune;
  communeArrivee!: Commune;
  communes: Commune[]= [];;
  selectedcommune!: Commune;
  isChecked: boolean = false;
  formGroup!: FormGroup;
  token = localStorage.getItem('token');

  ngOnInit() {

    this.formGroup = new FormGroup({
        date: new FormControl<Date | null>(null)
    });
   this.getCommune()
  this.getTrajets()
  this.getWilaya()
 
  this.getUserCurrent()
  }


  getUserCurrent(): void {
    
    this.getUser.getUser(this.token).subscribe(
      (data: Utilisateur) => {
        this.currentUser = data;
       
        console.log("useeeeeeeeeeer",this.currentUser)
        this.success = 'successful retrieval of the list';
      },
     
    );
  }
  goToProfile() {
    this.router.navigate(['/profil']);
  }
  getTrajets(): void {
 
    this.trajetService.getAll().subscribe(
    
      (data: Trajet[]) => {
        this.trajets = data;

        for (const trajet of this.trajets) {
         
          for (const commune of this.communes) {
           
            if (trajet.Lieu_depart === commune.id) { 
             
              const trajetInfoDepart = {
                Wilaya: commune.Wilaya,        // Assurez-vous que commune a une propriété Wilaya
                Nom_Commune: commune.Nom_Commune,  // Assurez-vous que commune a une propriété Nom_Commune
                id: trajet.id   

              };
              this.departs.push(trajetInfoDepart);
            }
          }
        }
        for (const trajet of this.trajets) {
         
          for (const commune of this.communes) {
           
            if (trajet.Lieu_arrive === commune.id) { 
             
              const trajetInfoArrive = {
                Wilaya: commune.Wilaya,        // Assurez-vous que commune a une propriété Wilaya
                Nom_Commune: commune.Nom_Commune,  // Assurez-vous que commune a une propriété Nom_Commune
                id: trajet.id   

              };
              this.arrives.push(trajetInfoArrive);
            }
          }
        }
        
        console.log("deeeeeeeeeeeeeeeep",this.departs);
        this.success = 'successful retrieval of the list';
      },
      error => {
        // Gérer les erreurs ici
      }
    );
  }
  


  getWilaya(): void {
    this.commune_wilayaServive.getAllWilaya().subscribe(
      (data: wilaya[]) => {
        this.wilayas = data; 
        console.log(this.wilayas); 
        this.success = 'successful retrieval of the list';
      },
      (error) => {
        this.error = 'Error retrieving wilayas: ' + error;
      }
    );
  }

  filterWilayas() {
    if (this.selectedwilaya && this.selectedwilaya.Nom_wilaya) {
      return this.communes.filter(commune => commune.Wilaya === this.selectedwilaya.Nom_wilaya);
    } else {
      return this.communes;
    }
  }
  filterWilayas1() {
    if (this.selectedwilaya1 && this.selectedwilaya1.Nom_wilaya) {
      return this.communes.filter(commune => commune.Wilaya === this.selectedwilaya1.Nom_wilaya);
    } else {
      return this.communes1;
    }
  }
  filterWilayas2() {
    if (this.selectedwilaya2 && this.selectedwilaya2.Nom_wilaya) {
      return this.communes.filter(commune => commune.Wilaya === this.selectedwilaya2.Nom_wilaya);
    } else {
      return this.communes2;
    }
  }
  filterWilayas3() {
    if (this.selectedwilaya3 && this.selectedwilaya3.Nom_wilaya) {
      return this.communes.filter(commune => commune.Wilaya === this.selectedwilaya3.Nom_wilaya);
    } else {
      return this.communes3;
    }
  }
  
getCommune(): void {
  this.commune_wilayaServive.getAllCommune().subscribe(
    (data: Commune[]) => {
      this.communes = data; 
      console.log(this.communes); 
      this.success = 'successful retrieval of the list';
    },
    (error) => {
      this.error = 'Error retrieving communes: ' + error;
    }
  );
}
/*filterTrajetsByDepart(wilayaDepart: wilaya, communeDepart: Commune, wilayaArrivee: wilaya, communeArrivee: Commune): void {
  this.trajets = this.trajets.filter(trajet =>
    trajet.Lieu_depart === wilayaDepart &&
    trajet.Depart_Commune === communeDepart &&
    trajet.Lieu_arrive === wilayaArrivee &&
    trajet.Arrive_Commune === communeArrivee
  );
}*/

addTrajet(addForm: NgForm) {
  console.log("tokkkkkkkkkkkkkkkkkkn",localStorage.getItem('token'))
  addForm.value.date_depart = this.datePipe.transform(addForm.value.date, 'yyyy-MM-dd');
  addForm.value.heure_depart = this.datePipe.transform(addForm.value.heure, 'HH.mm.ss');
  const newTrajet: Trajet ={
    nbr_place: addForm.value.nbr_place,
    Lieu_arrive: this.selectedcommune3.id,
    Lieu_depart: this.selectedcommune2.id,
    Heure_depart:addForm.value.heure_depart,
    Date_depart: addForm.value.date_depart,
    hebdomadaire:1 ,
    Chauffeur:this.currentUser?.id,
    id: 1
  }
  
  console.log("trajet recupere",newTrajet)
  
  this.trajetService.addTrajet(newTrajet).subscribe(
    (response: Trajet) => {
      console.log(response);
      const bouton= document.getElementById('annu');
      if (bouton ){bouton.click()}
     
    },
    (error: HttpErrorResponse) => {
     // addForm.reset();
    }
  );
  
  
  }

  deleteTrajet(idTrajet: number) {
    this.trajetService.deleteTrajet(this.currentUser.id, idTrajet).subscribe(
      response => {
        // Gérer la réponse de l'API ici
        console.log(response);
        // Supprimer le trajet du tableau trajets
        this.trajets = this.trajets.filter(trajet => trajet.id !== idTrajet);
        // Réinitialiser l'erreur en cas de succès
      
      },
      error => {
        // Gérer les erreurs ici
        console.error(error);
        // Afficher l'erreur à l'utilisateur
        this.deleteError = 'Erreur lors de la suppression du trajet.';
      }
    );
  }
  
  logout() {
    this.authService.logout();
  }
  searchCriteria = {
    date: null,
    wilaya: null,
    commune: null,
    numeroChauffeur: null
  };
  originalTrajets!: any[];
  public searchTrajets(key: string): void {
    console.log(key);
    const results: Trajet[] = [];
    for (const trajet of this.originalTrajets) {
      if (
        trajet.Date_depart.toLowerCase().includes(key.toLowerCase()) ||
        trajet.Lieu_depart.toString().toLowerCase().includes(key.toLowerCase()) ||
        trajet.Lieu_arrive.toString().toLowerCase().includes(key.toLowerCase()) ||
        trajet.Heure_depart.toLowerCase().includes(key.toLowerCase()) ||
        trajet.nbr_place.toString().toLowerCase().includes(key.toLowerCase()) ||
        trajet.hebdomadaire.toString().toLowerCase().includes(key.toLowerCase())
      ) {
        results.push(trajet);
      }
    }
  
    if (!key || results.length === 0) {
      // Si la clé est vide ou si aucune correspondance n'est trouvée, réinitialisez les trajets à la liste d'origine.
      this.trajets = this.originalTrajets;
    } else {
      this.trajets = results;
    }
  }
  updateTrajet(updateForm: NgForm){

    updateForm.value.date = this.datePipe.transform(updateForm.value.date, 'yyyy-MM-dd');
    updateForm.value.heure = this.datePipe.transform(updateForm.value.heure, 'HH:mm:ss');
  
     const trajet:any ={
       id: this.trajetUpdate.id,
       Chauffeur:this.trajetUpdate.Chauffeur ,
       commune_depart:this.selectedcommune2.id,
       commune_arrive: this.selectedcommune3.id,
       heure_depart:updateForm.value.heure,
       date_depart: updateForm.value.date,
       nbr_place: updateForm.value.nbr_place,
       hebdomadaire:1 ,
      }
console.log("trajet avnt envoi ",trajet)
    this.trajetService.updateTrajet(trajet).subscribe(
      (response: any) => {
        console.log(response);
        this.getTrajets();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  affectTrajetUpdate(trajet: Trajet) {

    for (const trajet of this.trajets) {
           
      for (const arrive of this.arrives) {
       
        if (trajet.id === arrive.id) { 
         
          const trajetInfoArriveUpdate = {
            Wilaya: arrive.Wilaya,        // Assurez-vous que commune a une propriété Wilaya
            Nom_Commune: arrive.Nom_Commune,  // Assurez-vous que commune a une propriété Nom_Commune
            id: trajet.id   
  
          };
         
          this.trajetUpdateDepart=trajetInfoArriveUpdate; 
          const wil = {
              Nom_wilaya:   this.trajetUpdateDepart.Wilaya,  
          };
          this.selectedwilaya3 = wil;
        }
      }
    }
    for (const trajet of this.trajets) {
           
      for (const depart of this.departs) {
       
        if (trajet.id === depart.id) { 
         
          const trajetInfoDepartUpdate = {
            Wilaya: depart.Wilaya,        // Assurez-vous que commune a une propriété Wilaya
            Nom_Commune: depart.Nom_Commune,  // Assurez-vous que commune a une propriété Nom_Commune
            id: trajet.id   
  
          };
         
          this.trajetUpdateDepart=trajetInfoDepartUpdate; 
          const wil = {
              Nom_wilaya:   this.trajetUpdateDepart.Wilaya,  
          };
          this.selectedwilaya2 = wil;
        }
      }
    }
    for (const commune of this.communes)
    {if (trajet.Lieu_arrive===commune.id)
        this.selectedcommune2=commune
    }
    for (const commune of this.communes)
    {if (trajet.Lieu_depart===commune.id)
        this.selectedcommune3=commune
    }
  
    this.dateDepart= new Date(trajet.Date_depart);
    this.heureDepart = new Date('1970-01-01T' + trajet.Heure_depart);this.trajetUpdate=trajet
  console.log("trajet  a  ypdate ",this.trajetUpdate)
  
  
  }
  
}



