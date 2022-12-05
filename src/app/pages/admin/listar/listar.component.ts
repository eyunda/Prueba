import  Swal  from 'sweetalert2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListaService } from '../../../services/lista.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit, OnDestroy {

  dtOptions : DataTables.Settings = {}

  dtTrigger : Subject<any> = new Subject<any>();

  listado : any;
  

  constructor(
    private listarService:ListaService,
    private snack:MatSnackBar
  ) { }
  

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      pagingType: "full_numbers"
    }


    this.cargarUsuarios();
    
  }

  


  cargarUsuarios(): void {
    
    this.listarService.listarUsuarios().subscribe(
      (dato:any) => {
        this.listado = dato;
        console.log(this.listado);
        this.dtTrigger.next({dato});
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar los usuarios','error');
      }
    );
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  borrar(id: number) {
    this.listarService.deletePersonas(id).subscribe(
      data => {
        Swal.fire('Usuario Eliminado', 'OK');
        this.cargarUsuarios();
      },
      (err) => {
        console.log(err);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    );
  }

}
