import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { ProductsComponent } from './features/products/products/products.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'api/auth/login', component: LoginComponent },
  { path: 'api/products', component: ProductsComponent },
  { path: 'dashboard', component: DashboardComponent },
];
