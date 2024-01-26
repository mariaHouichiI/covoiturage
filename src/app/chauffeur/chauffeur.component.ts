import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { wilaya } from '../wilaya';
import { Commune } from '../commune';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'; 
import { TrajetService } from '../trajet.service';
import { Trajet } from '../trajet';
import { WilayaCommuneService } from '../wilaya-commune.service';
@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css']
})
export class ChauffeurComponent {
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

  constructor(private trajetService: TrajetService, private commune_wilayaServive: WilayaCommuneService ) {
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
}
