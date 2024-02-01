import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { wilaya } from '../wilaya';
import { Commune } from '../commune';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms'; 
import { TrajetService } from '../trajet.service';
import { Trajet } from '../trajet';
import { WilayaCommuneService } from '../wilaya-commune.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
GoToGestionUser() {
  this.router.navigate(['/utilisateur']);
}
  sidebarVisible!: boolean;
  topSidebarVisible!:boolean;
  
  
addTrajet(addForm: NgForm) {
console.log("tokkkkkkkkkkkkkkkkkkn",localStorage.getItem('token'))
const newTrajet: Trajet ={
  nbr_place: 2,
  commune_arrive:1,
  commune_depart:2,
  heure_depart:"10:00:00",
  date_depart:"2022-10-10" ,
  hebdomadaire:1 ,
  chauffeur:1,
  id: 1
}

console.log("trajet recupere",newTrajet)

this.trajetService.addTrajet(newTrajet).subscribe(
  response => {
    if (response) {
      console.log('Trip added successfully:', response);
      // Handle success, if needed
    } 
  },
  error => {
    console.error('HTTP error:', error);
    // Handle HTTP error, if needed
  }
 
);
}
  selectedcommune1!: Commune;
  selectedwilaya1!: wilaya;
  selectedcommune2!: Commune;
  selectedwilaya2!: wilaya;
  selectedcommune3!: Commune;
  selectedwilaya3!: wilaya;
  departs:string []=[];
  communes1:Commune[] = [];
  communes2:Commune[] = [];
  communes3:Commune[] = [];
  addForm: FormGroup;

constructor(private router: Router,private fb: FormBuilder, private trajetService: TrajetService, private commune_wilayaServive: WilayaCommuneService) {
  this.addForm = this.fb.group({
    date: [null, Validators.required],
    heure: [null, Validators.required],
    // Ajoutez d'autres champs du formulaire au besoin
  });
}
  wilayas: wilaya[] = [];
  trajets: Trajet[]=[];
  error = '';
  success = '';
  
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
  communes!: Commune[];
  selectedcommune!: Commune;
  isChecked: boolean = false;
  formGroup!: FormGroup;


 
  ngOnInit() {
    this.formGroup = new FormGroup({
        date: new FormControl<Date | null>(null)
    });
  this.getTrajets()
  this.getWilaya()
  this.getCommune()
  this.sidebarVisible= true;
  }
 getTrajets(): void {
    this.trajetService.getAll().subscribe(
      (data: Trajet[]) => {
        this.trajets = data;
        for (const trajet of this.trajets) {
        //  this.departs.push(trajet.Lieu_depart.Nom_Commune);
              }
        console.log(this.trajets)
        this.success = 'successful retrieval of the list';
      },
     
    );
  }
  getDepart(){

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

  onSidebarShow() {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when the sidebar is open
  }

  onSidebarHide() {
    document.body.style.overflow = ''; // Allow scrolling when the sidebar is closed
  }
  

  onListeTrajetsClick(): void {
    this.trajetService.getAll().subscribe(
      (data) => {
        // Traitement des données ici
        console.log(data);
      },
      (error) => {
        // Gestion des erreurs ici
        console.error(error);
      }
    );
    
  }
 /* onListeUsersClick(): void {
    this.utilisateurService.getAll().subscribe(
      (data) => {
        // Traitement des données ici
        console.log(data);
      },
      (error) => {
        // Gestion des erreurs ici
        console.error(error);
      }
    );
    
  }*/

 
}

