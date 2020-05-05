import { Router } from '@angular/router';
import { Cliente } from './../../models/cliente.model';
import { FiltroConsulta } from './../../models/filtroconsulta.model';
import { Solicitud } from './../../models/solicitud.model';
import { AuxiliarService } from './../../lib/auxiliar.service';
import { NgxDatatableComponent } from './../../pages/tables/ngx-datatable/ngx-datatable.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-saldo',
  templateUrl: './detalle-saldo.component.html',
  styleUrls: ['./detalle-saldo.component.css'],
})
export class DetalleSaldoComponent implements OnInit {
  test: any = `<button (click)="onSelect($event)">Click me</button>`;
  entries = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;

  solicitudes: Solicitud[] = [];
  c: Cliente;

  constructor(private auxiliar: AuxiliarService,
    private router: Router) {
    this.temp = this.solicitudes.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  ngOnInit() {
    this.auxiliar.ubicacionActual = 'Detalle de Saldo';
    this.getCliente();
    this.getSolicitudes();
  }

  getSolicitudes() {
    const param = new FiltroConsulta();
    param.param_1 = this.auxiliar.getUsuarioConectado();

    this.auxiliar.getSolicitudes(param).subscribe(
      (results) => {
        this.solicitudes = results;
        this.temp = this.solicitudes.map((prop, key) => {
          return {
            ...prop,
            id: key,
          };
        });
      },
      (error) => {
        this.auxiliar.msgErrorDB('Error al cargar detalle', error);
      }
    );
  }

  getSaldo() {
    return this.c.saldoActual;
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    const val = $event.target.value;
    this.temp = this.solicitudes.filter(function (d) {
      if (d['detalle'].toString().toLowerCase().indexOf(val) !== -1) {
        return true;
      }

      if (d['embarque'].toString().toLowerCase().indexOf(val) !== -1) {
        return true;
      }

      if (d['fecha'].toString().toLowerCase().indexOf(val) !== -1) {
        return true;
      }

      return false;
    });
  }
  onSelect($event) {
    console.log('Select Event', $event);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }
  likeFunction($event) {}
  editFunction($event) {}
  deleteFunction($event) {}

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

  registrarPago() {
    this.router.navigate(['/', 'sistema', 'pagar']);
  }
}
