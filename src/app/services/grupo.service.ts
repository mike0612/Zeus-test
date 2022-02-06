import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient} from '@angular/common/http';
import { Grupo } from '../models/grupos.models';
import { EmpleadoGrupo } from '../models/empleado-grupo.models';


const base_url = environment.grupos_url;



@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private base_url2: string;

  constructor(
    private http: HttpClient
  ) { 
    this.base_url2 = `${environment.detalleGrupo_url}:${environment.nombre}${environment.detalleGrupoPost_url}`;
  }

  public obtenerGrupos(): Promise<Array<Grupo>> {
    return this.http.get(`${base_url}/:Miguel_CG`).toPromise().then((response: any) => {
      console.log('grupos service response  ', response);
      return response.data.groups.map((grupo) => {
        return new Grupo(grupo);
      });
    }).catch((err) => {
      console.error('grupos service error  ', err);
    });
  }

  public async obtenerDetalleGrupo(grupo: Grupo): Promise<Array<EmpleadoGrupo>> {
    return await this.http.get(`${this.base_url2}${grupo.id}`).toPromise().then((response: any) => {
      console.log('grupos service response  ', response);
      return response.data.employees.map((responseData) => {
        return new EmpleadoGrupo(responseData);
      });
    }).catch((err) => {
      console.error('grupos service error  ', err);
      return [];
    });
  }
}
