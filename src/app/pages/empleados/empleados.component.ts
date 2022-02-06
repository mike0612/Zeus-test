
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { empleadosForm } from './../../interfaces/empleados.interface';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [EmpleadosService]
})
export class EmpleadosComponent implements OnInit {


  model: NgbDateStruct;
  dataSource: MatTableDataSource<empleadosForm>;
  data: empleadosForm[];
  columns: string[] = ['id', 'name', 'last_name', 'birthday']

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  // Form group del empleado
  public empleadoForm: FormGroup;
  // Bandera para saber cuando se da click en el boton para enviar el formulario
  public formSubmitted: boolean;
  // Event emitter cuando se registra un usuario
  @Output() empleadoRegistradoAlert = new EventEmitter<boolean>();

  constructor(
    private empleadosService: EmpleadosService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {

    this.empleadosService.index()
      .subscribe(resp => {
       
        console.log(resp);
        this.data = resp.data.employees;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });

    // Inicializar el formulario
    this.empleadoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(30)]],
      birthday: ['', [Validators.required]]
    });
  }


  registarEmpleado(): void {
    this.formSubmitted = true;
    // Ver el valor del formulario
    console.log('form value ', this.empleadoForm);

    if (this.empleadoForm.invalid) { return; }

    // Send date in format YYYY/MM/DD
    console.log('registar empleado ', this.empleadoForm.value);

    this.empleadosService.registrarEmpleado(this.empleadoForm.value)
      .then((response) => {
        console.log('formulario componenent response ', response);
        this.ngOnInit();
        this.empleadoRegistradoAlert.emit(true);
      
        Swal.fire({
          icon: 'success',
          title: 'Registro realizado',
          showConfirmButton: true,
          timer: 1500
        });
      })
      .catch((err) => {
        console.error('formulario componenent response error ', err);
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error al realizar el resgistro',
          showConfirmButton: true,
          timer: 1500
        });
      })
      .finally(() => {
        this.formSubmitted = false;
        this.empleadoForm.reset();
      });
  }

  applyFilter(event) {
    this.ngOnInit();
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
