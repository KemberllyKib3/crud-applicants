import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicantListComponent } from './components/applicant-list/applicant-list.component';
import { ApplicantDetailComponent } from './components/applicant-detail/applicant-detail.component';
import { ApplicantAddComponent } from './components/applicant-add/applicant-add.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component:HomeComponent},
  {path: 'add-applicant', component:ApplicantAddComponent},
  {path: 'applicants', component:ApplicantListComponent},
  {path: 'edit-applicant/:id', component:ApplicantDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
