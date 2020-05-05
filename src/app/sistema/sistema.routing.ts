import { RegistrarPagoComponent } from './registrar-pago/registrar-pago.component';
import { InicioComponent } from './inicio/inicio.component';
import { DetalleSaldoComponent } from './detalle-saldo/detalle-saldo.component';
import { Routes } from '@angular/router';

export const SistemaRoutes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
        component: InicioComponent
  },
  {
    path: '',
    children: [
      {
        path: 'detallesaldo',
        component: DetalleSaldoComponent
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'pagar',
        component: RegistrarPagoComponent
      }
    ]
  }
];
