import { Component } from '@angular/core';
import { wilaya } from '../wilaya';
import { Commune } from '../commune';
import { FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms'; 
import { TrajetService } from '../trajet.service';
import { Trajet } from '../trajet';
import { WilayaCommuneService } from '../wilaya-commune.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { GetUserService } from '../get-user.service';
import { Utilisateur } from '../utilisateur';
import { UtilisateurService } from '../utilisateur.service';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation';
import { User1 } from '../user1';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {



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
  users: { nomUser: string, prenomUser: string, id: number }[] = [];
  communes1:Commune[] = [];
  communes2:Commune[] = [];
  communes3:Commune[] = [];
  reservations:Reservation[]=[];
  utilisateurs : User1[] = [];
  currentUser!: Utilisateur;
  deleteError: string | undefined;
constructor(private router : Router,private resService: ReservationService,private getUser :GetUserService,private datePipe: DatePipe, private authService: AuthService,private utilisateurService:UtilisateurService,private trajetService: TrajetService, private commune_wilayaServive: WilayaCommuneService) {
 
}
  wilayas: wilaya[] = [];
  trajets: Trajet[]=[];
  error = '';
  success = '';
  
  styleOBJ = {
    borderRadius: '5px',
    border: '0.5px solid #DDD',
    background: '#FBFBFB',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)','margin-left': '22%','margin-right': '3%',
  };

styledown = {'margin-bottom': '15%'};
  wialays!: wilaya[];
  value: string | undefined;
  selectedwilaya!: wilaya;
  communes: Commune[]= [];;
  selectedcommune!: Commune;
  isChecked: boolean = false;
  formGroup!: FormGroup;
  token = localStorage.getItem('token');

 
  ngOnInit() {
     this.getUserCurrent()
    this.formGroup = new FormGroup({
        date: new FormControl<Date | null>(null)
    }); 
    this.getUsers()
   this.getCommune()
  this.getTrajets()
  this.getWilaya()
 this.getRes()
  }
  logout() {
    this.authService.logout();
  }
  goToProfile() {
    this.router.navigate(['/profil']);
  }
  isReservationEnAttente(trajetId: number): boolean {
    console.log("Current User ID:", this.currentUser.id);
    console.log("Reservations:", this.reservations);
    
    const reservationEnAttente = this.reservations.find(reservation =>
      reservation.Trajet === trajetId && 
      reservation.Passagere === this.currentUser.id && 
      reservation.Approuver === "0"
    );
    
    console.log("Reservation en Attente:", reservationEnAttente);
  
    if (reservationEnAttente) {
      return true;
    } else {
      return false;
    }
  }
  
  addRes(idTrajet: number, passagere: number) {
    this.resService.ajouterRes(idTrajet, passagere).subscribe(
      response => {
        this.getTrajets();
      },
      error => {
        console.error(error);
        this.getTrajets();
      }
    );
  } 

  filterByWilayaArrive(wilaya: number): void {
    this.trajets = [];
    this.trajetService.getByCommune(this.selectedcommune.id,this.selectedcommune1.id).subscribe(
      (trajets: Trajet[]) => {
        this.trajets = trajets;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
     
  getUsers(): void {
    this.utilisateurService.getAll().subscribe(
      (data: User1[]) => {
        console.log("les users recupere",data);
        this.utilisateurs = data;
        for (const trajet of this.utilisateurs) {
        //  this.departs.push(trajet.Lieu_depart.Nom_Commune);
              }
        console.log(this.utilisateurs)
        this.success = 'successful retrieval of the list';
      },
     
    );
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
  usersDisplayedMap: { [userId: number]: boolean } = {};

  // ... rest of your component code ...

  // Function to check if a user has been displayed
  isUserDisplayed(userId: number): boolean {
    return this.usersDisplayedMap[userId];
  }

  // Function to mark a user as displayed
  markUserAsDisplayed(userId: number): void {
    this.usersDisplayedMap[userId] = true;
  }
  getTrajets(): void {
 
    this.trajetService.getAll().subscribe(
    
      (data: Trajet[]) => {
        this.trajets = data;
        for (const trajet of this.trajets) {
          for (const user of this.utilisateurs) {
            if (trajet.Chauffeur === user.id) {
              // Check if user with the same id already exists in this.users
              const userExists = this.users.some(existingUser => existingUser.id === user.id);
        
              if (!userExists) {
                const trajetInfoUser = {
                  nomUser: user.Nom,
                  prenomUser: user.Prenom,
                  id: user.id   
                };
                this.users.push(trajetInfoUser);
              }
            }
          }
        }
        
        
console.log("useeeeeeeeers",this.users)
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
  getRes(): void {
    this.resService.getAll().subscribe(
      (data: Reservation[]) => {
        this.reservations = data; 
        console.log(this.reservations); 
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




  }





