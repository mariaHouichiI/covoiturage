
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
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';
  


  @Component({
    selector: 'app-dem-res',
    templateUrl: './dem-res.component.html',
    styleUrls: ['./dem-res.component.css']
  })
  export class DemResComponent {



  affectResUpdate(idPass:number, idTraj: number) {

    this.resService.approuve(idPass,idTraj).subscribe(
      (data: boolean) => {
       
        this.success = 'successful retrieval of the list';
      },
      (error) => {
        this.error = 'Error retrieving communes: ' + error;
      }
    );

  
  
  }
  listeTrajets:Trajet[]=[]

  reservations:Reservation[]=[];
  heureDepart!: Date;
    dateDepart!: Date;
    trajetUpdateDepart!: { Wilaya: string; Nom_Commune: string; id: number; };
  trajetUpdateArrive!:{ Wilaya: string, Nom_Commune: string, id: number }
    resUpdate!: Reservation; 
    listeIdTrajets: number[]=[]
    listRes:any[]=[]
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
  
  constructor(private resService: ReservationService,private getUser :GetUserService,private router : Router,private datePipe: DatePipe, private authService: AuthService,private trajetService: TrajetService, private commune_wilayaServive: WilayaCommuneService) {
   
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
    communes: Commune[]= [];;
    selectedcommune!: Commune;
    isChecked: boolean = false;
    formGroup!: FormGroup;
    token = localStorage.getItem('token');
  
   
    ngOnInit() {
     this.newListe()
      this.formGroup = new FormGroup({
          date: new FormControl<Date | null>(null)
      });
     this.getCommune()
    this.getWilaya()
    this.getUserCurrent()
    this.getRes()
  

    }
  
    getUserCurrent(): void {
      
      this.getUser.getUser(this.token).subscribe(
        (data: Utilisateur) => {
          this.currentUser = data;
          this.getTrajets();
          console.log("useeeeeeeeeeer",this.currentUser)
          this.success = 'successful retrieval of the list';
        },
       
      );
    }
    goToProfile() {
      this.router.navigate(['/profile']);
    }
    getRes(): void {
      this.resService.getAll().subscribe(
        (data: Reservation[]) => {
          this.reservations = data; 
          console.log("les reeeeeeeees",this.reservations); 
          this.success = 'successful retrieval of the list';
        },
        (error) => {
          this.error = 'Error retrieving wilayas: ' + error;
        }
      );
    }
    getListeRes(){
      this.resService.demRes(this.currentUser.id).subscribe(
        (data: Reservation[]) => {
          this.listRes = data; 
          console.log(this.listRes); 
          this.success = 'successful retrieval of the list';
          this.listRes.map(res => {
            res[1] = this.trajets.find(trajet => trajet.id === res[1])
            return res;
          });
        },
        (error) => {
          this.error = 'Error retrieving wilayas: ' + error;
        }
      );

    }
  
    getTrajets(): void {
   
      this.trajetService.getAll().subscribe(
      
        (data: Trajet[]) => {
          this.trajets = data;
          this.getListeRes()
  
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
   
    newListe() {
    
          for (const res of this.reservations) {
            console.log("mes2");
            if (res.Passagere === this.currentUser.id && res.Approuver === "1") {
              console.log("mes3");  this.listeIdTrajets.push(res.Trajet);
            }
          }
          console.log("listeIDD", this.listeIdTrajets);
    
          for (const trajet of this.trajets) {
            console.log("mes1");
            for (const idT of this.listeIdTrajets) {
              if (trajet.id === idT) {
                this.listeTrajets.push(trajet);
              }
            }
          }
          console.log("listettra", this.listeTrajets);
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
    updateTrajet(updateForm: NgForm){
  
      updateForm.value.date = this.datePipe.transform(updateForm.value.date, 'yyyy-MM-dd');
      updateForm.value.heure = this.datePipe.transform(updateForm.value.heure, 'HH:mm:ss');
      
       const trajet:any ={
    
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
    deleteRes(idTrajet: number) {
      this.trajetService.deleteTrajet(this.currentUser.id, idTrajet).subscribe(
        (response: any) => {
          console.log(response);
          // Supprimer le trajet du tableau trajets
          this.trajets = this.trajets.filter(trajet => trajet.id !== idTrajet);
        
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    
    logout() {
      this.authService.logout();
    }
  
    }
  
  
  
  
  