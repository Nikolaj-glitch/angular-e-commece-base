import { Component } from '@angular/core';
import { OrderListComponent } from '../order-list/order-list.component';
import { ProductsComponent } from '../products/products/products.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [OrderListComponent, ProductsComponent],
  styleUrl: './dashboard.component.scss',
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      <section class="dashboard-section">
        <app-products></app-products>
      </section>

      <section class="dashboard-section">
        <h2>Lista Ordini</h2>
        <app-order-list></app-order-list>
      </section>
    </div>
  `,
})
export class DashboardComponent {}
