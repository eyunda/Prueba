import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    


    constructor(private httpClient: HttpClient) { }

    public get(id: any){
      return this.httpClient.get(`${baserUrl}/personas/listar/${id}`);
    }

    public añadirUsuario(user:any){
      return this.httpClient.post(`${baserUrl}/usuarios/`,user);
    }
    public añadirPersona(user:any){
      return this.httpClient.post(`${baserUrl}/personas/`,user);
    }

    public getAllPhone(){
      return this.httpClient.get(`${baserUrl}/phone`);
    }

    public update(user:any){
      return this.httpClient.put(`${baserUrl}/personas/editar/`,user);
    }
    
}
