import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { ProductsComponent } from './features/products/products/products.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { OrderListComponent } from './features/order-list/order-list.component';
import { OrderItemsComponent } from './features/order-items/order-items.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'api/products', component: ProductsComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'items', component: OrderItemsComponent },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];
