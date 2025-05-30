import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { OrderListService } from '../order-list/order-list.services';
import { OrderItem, Product, OrderItemService } from './order-items-services';
@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    FormsModule,
    NgFor],
  styleUrl: './order-items.component.scss',
  template: `
    <div>
      <h1>Ordini</h1>
      <div class="controls">
        <input type="text" [(ngModel)]="searchTerm" placeholder="Cerca per nome prodotto" />
        <select [(ngModel)]="sortOption">
          <option value="">Ordina per</option>
          <option value="product">Nome prodotto</option>
          <option value="price">Prezzo totale</option>
        </select>
      </div>

      <div class="product-grid">
        <mat-card class="product-card" *ngFor="let item of filteredOrderItems">
          <mat-card-header>
            <mat-card-title>{{ item.product.name }}</mat-card-title>
            <mat-card-subtitle>{{ item.price }} € ({{ item.quantity }} pz)</mat-card-subtitle>
          </mat-card-header>

          <img class="card-image" [src]="item.product.imageUrl" alt="{{ item.product.name }}" />

          <mat-card-content>
            <p>{{ item.product.description }}</p>
            <p>Disponibilità: {{ item.product.stock }}</p>
            <p>Ordine ID: {{ item.orderId }}</p>
            <p>Email: {{ getEmailByOrderId(item.orderId) }}</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class OrderItemsComponent implements OnInit {
  orderItems: OrderItem[] = [];
  searchTerm: string = '';
  sortOption: string = '';
  loading = false;
  error: string | null = null;

  constructor(
    private orderItemService: OrderItemService,
    private orderService: OrderListService  // Inject orders service here
  ) { }

  orders: any[] = [];
  orderItem: OrderItem[] = [];

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;

      this.orderItemService.getOrderItems().subscribe(items => {
        this.orderItems = items;
      });
    });
  }

  getEmailByOrderId(orderId: string): string {
    const order = this.orders.find(o => o._id === orderId);
    return order?.user?.email || 'Email non disponibile';
  }
  loadOrderItems(): void {
    this.loading = true;
    this.orderItemService.getOrderItems().subscribe({
      next: (items) => {
        this.orderItems = items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Errore durante il caricamento degli ordini:', err);
        this.error = 'Errore nel caricamento dati.';
        this.loading = false;
      }
    });
  }

  get filteredOrderItems(): OrderItem[] {
    let filtered = this.orderItems;

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(item =>
        item.product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.sortOption === 'product') {
      filtered = filtered.sort((a, b) =>
        a.product.name.localeCompare(b.product.name)
      );
    } else if (this.sortOption === 'price') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    return filtered;
  }
}
