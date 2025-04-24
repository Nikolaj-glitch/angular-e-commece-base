import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { ProductsComponent } from './features/products/products/products.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'api/products', component: ProductsComponent }

];
