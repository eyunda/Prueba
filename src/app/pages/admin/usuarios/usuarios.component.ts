import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { PersonaService } from '../../../services/persona.service';
import {MatTableDataSource} from '@angular/material/table';
import { AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  personaForm!: FormGroup;
  personas: any;
  id: any;
  dataSource!: MatTableDataSource<any>;
  
  dtOptions : DataTables.Settings = {}

  dtTrigger : Subject<any> = new Subject<any>();

  listado : any;

  displayedColumns: string[] = ['id', 'name', 'email', 'password', 'phones', 'options'];

  panelOpenState = false;
  persona : any;

  constructor(
    public fb: FormBuilder,
    public personaService: PersonaService
  ) {

  }
  ngAfterViewInit(): void {
    this.setDataAndPagination();
  }
  ngOnInit(): void {

    this.personaForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phones: ['', Validators.required],
    });
    

    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
      this.setDataAndPagination();
      this.dtTrigger.next({resp});
    },
      error => { console.error(error) }
    );

    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      pagingType: "full_numbers"
    }
  }

  /**
   * Metodo que llama el boton de guardar. Enviamos la peticion la servicio, luego reseteamos el formulario, filtramos
   * y reseteamos la paginacion.
   */
  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset(); 
      this.personaForm.setErrors(null);
      this.personas=this.personas.filter((persona: { id: any; })=> resp.id!==persona.id);
      this.personas.push(resp);
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  /**
   * Metodo que elimina una persona, luego reseteamos la paginacion.
   * @param persona parametro donde se indica la persona a eliminar.
   */
  eliminar(persona: { id: any; }){
    this.personaService.deletePersonas(persona.id).subscribe(resp=>{
      if(resp){
        this.personas.pop(persona);
        this.setDataAndPagination();
      }
    })
  }

  /**
   * Seteamos los datos en el formulario con la persona que vamos a editar.
   * @param persona parametro donde se indica la persona a eliminar.
   */
  editar(persona: { id: any; name: any; email: any; password: any; phones: any; }){
    this.personaForm.setValue({
      id:persona.id,
      name: persona.name ,
      email: persona.email ,
      password: persona.password,
      phones: persona.phones
    });
    this.panelOpenState = !this.panelOpenState;
  }

  setDataAndPagination(){
    this.dataSource = new MatTableDataSource(this.personas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}