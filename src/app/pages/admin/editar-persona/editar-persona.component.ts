import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaService } from 'src/app/services/lista.service';
import  Swal  from 'sweetalert2';


@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {
  constructor(
    private route:ActivatedRoute,
    private listaService:ListaService,

    private router:Router) { }

  persona:any;
  

  ngOnInit(): void {
    
  }

  public actualizar(){
    this.listaService.actualizarDatos(this.persona).subscribe(
      (data) => {
        Swal.fire('Examen actualizado','El usuario ha sido actualizado con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/listar']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar el examen','error');
        console.log(error);
      }
    )
  }
}
