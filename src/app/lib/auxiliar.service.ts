import { Solicitud } from './../models/solicitud.model';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from './../models/cliente.model';
import { FiltroConsulta } from './../models/filtroconsulta.model';
import { Login } from './../models/login.model';
import { LoginData } from './../models/logindata.model';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class AuxiliarService {
  conectado = false;
  gerencial = false;
  public loginData = new LoginData();
  public ubicacionActual = 'Dashboard';

  currentApi = 'http://localhost:56782/api/TransoceanicApi/';
  currentToken = 'DevTOLoginData';

  devApi = 'http://localhost:56782/api/TransoceanicApi/';
  serverApi = 'http://creaxisapi.creaxis.xyz/api/TransoceanicApi';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(protected _http: HttpClient, private toastr: ToastrService) {}

  public getNombreSistema() {
    return 'TransOceanic Client Services - v.05.05.20';
  }


  // -- Helpers -- //
  public msgPregunta(msg: string): Observable<boolean> {
    const studentsObservable = new Observable<boolean>((observer) => {
      swal({
        title: 'Confirmar',
        text: msg,
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      });
    });

    return studentsObservable;
  }

  public msgSuccess(ptitle: string, pmsg: string): void {
    swal({
      title: ptitle,
      text: pmsg,
      type: 'success',
      confirmButtonText: 'Ok',
    });
  }

  public msgError(ptitle: string, pmsg: string): void {
    swal({
      title: 'Error!',
      text: pmsg,
      type: 'error',
      confirmButtonText: 'Ok',
    });
  }

  public msgErrorDB(pmsg: string, errorDBObject: any): void {
    let errordb = '';

    if (errorDBObject.error.Message) {
      errordb = this.procesarErrorDB(errorDBObject.error.Message);
    } else {
      if (errorDBObject.message) {
        errordb = this.procesarErrorDB(errorDBObject.message);
      }
    }

    pmsg = pmsg + ' - ' + errordb;

    swal({
      title: 'Error!',
      text: pmsg,
      type: 'error',
      confirmButtonText: 'Ok',
    });
  }

  procesarErrorDB(mensaje: string): string {
    let retorno = '';
    let pos = 0;

    pos = mensaje.indexOf('Http failure response');

    if (pos >= 0) {
      return 'Error de Conexion a Internet';
    }

    pos = mensaje.indexOf('DB!');

    retorno = mensaje;

    if (pos >= 0) {
      retorno = mensaje.substring(pos + 3);
      retorno = retorno.replace('}', '');
      retorno = retorno.replace('"', '');
    }

    return retorno;
  }

  showToast(message) {
    this.toastr.show(
      '<span class="now-ui-icons ui-1_bell-53"></span>', message,
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-info alert-with-icon',
        positionClass: 'toast-top-right'
      }
    );
  }

  showToastError(message) {
    this.toastr.show(
      '<span class="now-ui-icons ui-1_bell-53"></span>', message,
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-top-right'
      }
    );
  }

  // -- FIN Helpers -- //

  // -----------------LOGIN--------------------

  validarLogin(f: Login): Observable<Login> {
    const body = JSON.stringify(f);
    const url = this.currentApi + '/login/';
    return this._http.post<Login>(url, body, this.httpOptions);
  }

  // Login
  public isConnected(): boolean {
    this.loginData = JSON.parse(sessionStorage.getItem(this.currentToken));

    if (this.loginData) {
      this.gerencial = this.loginData.gerencial;
      return this.loginData.conectado;
    }

    return false;
  }

  public logout() {
    this.loginData = new LoginData();
    sessionStorage.setItem(this.currentToken, JSON.stringify(this.loginData));
    this.showToast('Sesion Cerrada');
  }

  public inicializarLogin(par: Login): boolean {
    this.loginData = new LoginData();

    this.loginData.usuarioConectado = par.username;
    this.loginData.nombreUsuarioConectado = par.name_user;
    this.loginData.conectado = true;
    this.loginData.nombreEmpresa = par.company_name;
    this.loginData.gerencial = par.kind === 1;

    this.gerencial = this.loginData.gerencial;

    sessionStorage.setItem(this.currentToken, JSON.stringify(this.loginData));

    return true;
  }

  public getUsuarioConectado(): string {
    this.loginData = JSON.parse(sessionStorage.getItem(this.currentToken));

    return this.loginData.usuarioConectado;
  }

  public getNombreUsuarioConectado(): string {
    return this.loginData.nombreUsuarioConectado;
  }

  public getNombreEmpresa() {
    return this.loginData.nombreEmpresa;
  }

  // --  FIN ACCIONES LOGIN -- >>


  // -- CLIENTES -- //
  getCliente(f: FiltroConsulta): Observable<Cliente> {
    const body = JSON.stringify(f);
    const url = this.currentApi + '/getCliente/';

    return this._http.post<Cliente>(url, body, this.httpOptions);
  }

  // -- SOLICITUDES -- //
  getSolicitudes(f: FiltroConsulta): Observable<Solicitud[]> {
    const body = JSON.stringify(f);
    const url = this.currentApi + '/getSolicitudes/';

    return this._http.post<Solicitud[]>(url, body, this.httpOptions);
  }



}
