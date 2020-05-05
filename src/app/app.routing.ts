import { AuthGuard } from './lib/auth.guard';
import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './sistema/sistema.module#SistemaModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'sistema',
        loadChildren: './sistema/sistema.module#SistemaModule',
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'pages',
        loadChildren: './pages/pages/pages.module#PagesModule',
      },
    ],
  },
];
