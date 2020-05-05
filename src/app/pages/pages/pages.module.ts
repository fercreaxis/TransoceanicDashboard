import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LockComponent } from './lock/lock.component';
import { PricingComponent } from './pricing/pricing.component';
import { PagesRoutes } from './pages.routing';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(PagesRoutes)],
  declarations: [
    LoginComponent,
    LockComponent,
    PricingComponent
  ]
})
export class PagesModule {}
