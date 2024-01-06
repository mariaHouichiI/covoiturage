import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { wilaya } from '../wilaya';
import { Commune } from '../commune';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'; 
import { Trajet } from '../trajet';
import { TrajetService } from '../trajet.service';
@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css']
})
export class ChauffeurComponent {

  
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
  success: string | undefined;
  trajets!: Trajet[];
  constructor(private trajetService : TrajetService){}
  ngOnInit() {
    this.formGroup = new FormGroup({
        date: new FormControl<Date | null>(null)
    });
  }
  getTrajets(): void {
    this.trajetService.getAll().subscribe(
      (data: Trajet[]) => {
        this.trajets = data;
        console.log(this.trajets)
        this.success = 'successful retrieval of the list';
      },
     
    );
  }
 
}
