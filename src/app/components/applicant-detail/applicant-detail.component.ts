import { Applicant } from './../../services/applicant';
import { CrudService } from './../../services/crud.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, FormControlName } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.css']
})
export class ApplicantDetailComponent implements OnInit {

  getId: any;
  updateForm!: FormGroup;
  Applicants: any = [];
  checkDisp: string[] = [];
  checkDay: string[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
  ) { }

  data_disponibility: Array<any> = [
    { name: 'Até 4 horas por dia', value: 'Até 4 horas por dia' },
    { name: 'De 4 á 6 horas por dia', value: 'De 4 á 6 horas por dia' },
    { name: 'De 6 á 8 horas por dia', value: 'De 6 á 8 horas por dia' },
    { name: 'Acima de 8 horas por dia (tem certeza?)', value: 'Acima de 8 horas por dia (tem certeza?)' },
    { name: 'Apenas finais de semana', value: 'Apenas finais de semana' }
  ];

  data_day_period: Array<any> = [
    { name: 'Manhã (de 08:00 ás 12:00)', value: 'Manhã (de 08:00 ás 12:00)' },
    { name: 'Tarde (de 13:00 ás 18:00)', value: 'Tarde (de 13:00 ás 18:00)' },
    { name: 'Noite (de 19:00 as 22:00)', value: 'Noite (de 19:00 as 22:00)' },
    { name: 'Madrugada (de 22:00 em diante)', value: 'Madrugada (de 22:00 em diante)' },
    { name: 'Comercial (de 08:00 as 18:00)', value: 'Comercial (de 08:00 as 18:00)' }
  ];

  onCheckboxChange(field: string, e: any) {
    const checkArray: FormArray = this.updateForm.get(field) as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  ngOnInit(): void {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetApplicant(this.getId).subscribe(res => {
      this.checkDisp = res['disponibility'];
      this.checkDay = res['day_period'];

      this.updateForm.setValue({
        email: res['email'],
        name: res['name'],
        whatsapp: res['whatsapp'],
        linkedin: res['linkedin'],
        city: res['city'],
        UF: res['UF'],
        portfolio: res['portfolio'],
        desired_salary: res['desired_salary'],
        disponibility: res['disponibility'],
        day_period: res['day_period'],
      });
    });

    this.updateForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      whatsapp: ['', Validators.required],
      linkedin: [''],
      UF: ['', Validators.required],
      city: ['', Validators.required],
      portfolio: [''],
      disponibility: this.formBuilder.array([]),
      day_period: this.formBuilder.array([]),
      desired_salary: ['', Validators.required],
    });
  }

  onUpdate(): any {
    this.crudService.updateApplicant(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Dados atualizados com sucesso!')
        this.ngZone.run(() => this.router.navigateByUrl('/applicants'))
      }, (err) => {
        console.log(err);
      });
  }

  checkValue(value: string): any {
    if (this.checkDisp.find(val => val === value) || this.checkDay.find(val => val === value)) {
      return true;
    }
  }
}
