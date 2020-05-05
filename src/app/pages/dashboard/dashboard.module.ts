import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../components/components.module';

import { DashboardRoutes } from './dashboard.routing';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(DashboardRoutes),
    ComponentsModule,
    ChartsModule,
    FormsModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}