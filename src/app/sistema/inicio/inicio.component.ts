import { Router } from '@angular/router';
import { AuxiliarService } from './../../lib/auxiliar.service';
import { FiltroConsulta } from './../../models/filtroconsulta.model';
import { Cliente } from './../../models/cliente.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

 
  c: Cliente;

  constructor(public auxiliar: AuxiliarService,
    public router: Router) {}

  ngOnInit() {
    this.auxiliar.ubicacionActual = 'Inicio';
    this.getCliente();
  }

  getCliente() {
    const param = new FiltroConsulta();
    param.param_1 = this.auxiliar.getUsuarioConectado();

    this.auxiliar.getCliente(param)
    .subscribe(results => {
      this.c = results;
    }, error => {
      this.auxiliar.msgErrorDB('Error al consultar cliente', error);
    });
  }

  verDetalleSaldo() {
    this.router.navigate(['/', 'sistema', 'detallesaldo']);
  }

  registrarPago() {
    this.router.navigate(['/', 'sistema', 'pagar']);
  }

}
