import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Applicant } from './applicant';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // nodeApi
  REST_API: String = 'http://localhost:3000/api';

  // leitor de http
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // adicionar um novo canditado
  AddApplicant(data: Applicant): Observable<any> {
    let API_URL = `${this.REST_API}/add-applicant`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError))

  }

  // listar todos os candidatos
  GetAllApplicants() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  GetApplicant(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/edit-applicant/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError)
      )
  }

  // atualizar um candidato
  updateApplicant(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-applicant/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError))
  }

  deleteApplicant(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-applicant/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }


  // error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // erro no client side
      errorMessage = error.error.message;
    } else {
      // erro no server side
      errorMessage = `Código de erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
