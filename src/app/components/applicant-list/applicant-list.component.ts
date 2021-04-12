import { CrudService } from './../../services/crud.service';
import { Applicant } from './../../services/applicant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class ApplicantListComponent implements OnInit {

  Applicants: any = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetAllApplicants().subscribe(res => {
      console.log(res)
      this.Applicants = res;
    });
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Você tem certeza que deseja continuar?')) {
      this.crudService.deleteApplicant(id).subscribe((res) => {
        this.Applicants.splice(i, 1);
      });
    }
  }

}
