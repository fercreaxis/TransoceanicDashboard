import { FiltroConsulta } from './../../models/filtroconsulta.model';
import { Cliente } from './../../models/cliente.model';
import { AuxiliarService } from './../../lib/auxiliar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css']
})
export class RegistrarPagoComponent implements OnInit {

  c: Cliente;

  pagoManual = false;
  valorPagar = 0;

  constructor(public auxiliar: AuxiliarService) { }

  ngOnInit() {
    this.auxiliar.ubicacionActual = 'Registrar Pago';
    this.getCliente();
  }

  getCliente() {
    const param = new FiltroConsulta();
    param.param_1 = this.auxiliar.getUsuarioConectado();

    this.auxiliar.getCliente(param).subscribe(
      (results) => {
        this.c = results;
      },
      (error) => {
        this.auxiliar.msgErrorDB('Error al consultar cliente', error);
      }
    );
  }

  siguiente() {

  }

  cambiaOpcionPagoManual(e: any){
  }

}
