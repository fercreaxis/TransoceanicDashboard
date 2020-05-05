import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SistemaRoutes } from './sistema.routing';
import { InicioComponent } from './inicio/inicio.component';
import { DetalleSaldoComponent } from './detalle-saldo/detalle-saldo.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrarPagoComponent } from './registrar-pago/registrar-pago.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SistemaRoutes),
    NgxDatatableModule,
    FormsModule,
    NgbModule,
    JwBootstrapSwitchNg2Module
  ],  declarations: [DetalleSaldoComponent, InicioComponent, RegistrarPagoComponent],

  providers: []
})
export class SistemaModule {}
