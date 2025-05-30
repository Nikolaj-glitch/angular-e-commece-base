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
  templateUrl: './order-items.component.html',
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
