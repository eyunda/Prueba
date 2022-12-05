import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  actualizarUsuario(examen: any) {
    throw new Error('Method not implemented.');
  }
  obtenerusuario(examenId: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  public listarUsuarios(){
    return this.http.get(`${baserUrl}/person`);
  }

  public agregarPersonas(persona : any): Observable<any>{
    return this.http.post(`${baserUrl}`, persona);
  }

  public deletePersonas(id: number): Observable<any>{
    return this.http.delete(`${baserUrl}/usuarios/eliminar/`+id);
  }

  public editarPersonas(id: number, persona : any): Observable<any>{
    return this.http.put(`${baserUrl}/usuarios/update/`+id, persona);
  }

  public actualizarDatos(usuario:any){
    return this.http.put(`${baserUrl}/usuarios/update`,usuario);
  }
  
 /*
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
  */
}
