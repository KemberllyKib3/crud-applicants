import { Applicant } from './../../services/applicant';
import { CrudService } from './../../services/crud.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-add',
  templateUrl: './applicant-add.component.html',
  styleUrls: ['./applicant-add.component.css']
})
export class ApplicantAddComponent implements OnInit {

  applicantForm!: FormGroup;

  get email() { return this.applicantForm.get('email') }
  get name() { return this.applicantForm.get('name') }
  get whatsapp() { return this.applicantForm.get('whatsapp') }
  get city() { return this.applicantForm.get('city') }
  get UF() { return this.applicantForm.get('UF') }
  get desired_salary() { return this.applicantForm.get('desired_salary') }

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private CrudService: CrudService,
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

  ngOnInit(): void {
    this.applicantForm = this.formBuilder.group({
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

  onCheckboxChange(field: string, e: any) {
    const checkArray: FormArray = this.applicantForm.get(field) as FormArray;

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

  onSubmit(): any {
    this.CrudService.AddApplicant(this.applicantForm.value)
      .subscribe(() => {
        console.log('Dados adicionados com sucesso!')
        this.ngZone.run(() => this.router.navigateByUrl('/applicants'))
      }, (error) => {
        console.log(error);
      });
  }

  reset(): any {
    this.applicantForm.reset();
  }
}
