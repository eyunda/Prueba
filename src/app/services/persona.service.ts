import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
 

  constructor(private httpClient: HttpClient) { }



  public getAllPersonas(){
    return this.httpClient.get(`${baserUrl}/person`);
  }

  public savePersona (persona:any): Observable<any>{
    return this.httpClient.post(`${baserUrl}/person`,persona);
  }
  
  public deletePersonas(id: number): Observable<any>{
    return this.httpClient.delete(`${baserUrl}/person/delete/`+id);
  }
}