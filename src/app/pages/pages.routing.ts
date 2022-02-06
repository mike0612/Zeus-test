import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { GruposComponent } from './grupos/grupos.component';


const routes: Routes = [

    { path: 'inicio', 
    component: PagesComponent,
    children: [
      { path: '', component: InicioComponent, data:{titulo: 'Inicio'} },
      { path: 'empleados', component: EmpleadosComponent, data:{titulo: 'Empleados'} }, 
      { path: 'grupo', component: GruposComponent, data:{titulo: 'Grupo'} }
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}