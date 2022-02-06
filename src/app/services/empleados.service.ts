import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient} from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

const base_url = environment.empleados_url;

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(
    private http: HttpClient
  ) { }

  index() {

    return this.http.get(`${base_url}/:Miguel_CG`, {
    
    }).pipe(
      tap((resp: any) =>{
        console.log(resp);
      }),
  
    );
  }

  public registrarEmpleado(empleado: any): Promise<any> {
    return this.http.post(`${base_url}/:Miguel_CG`, empleado).toPromise().then((response: any) => {
      console.log('empleados service response registrarEmpleado ', response);
      return response.data;
    }).catch((err) => {
      console.error('empleados service error registrarEmpleado ', err);
    });
  }
}
