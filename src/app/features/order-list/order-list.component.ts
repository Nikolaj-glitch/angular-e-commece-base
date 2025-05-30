import { Component, OnInit } from '@angular/core';
import { Order, OrderListService } from './order-list.services';
import { OrderItem, OrderItemService } from '../order-items/order-items-services';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  template: `
    <div>
      <label for="statusFilter">Filter by Status:</label>
      <select id="statusFilter" [(ngModel)]="selectedStatus" (change)="applyFilter()">
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    <div>
      <input type="text" [(ngModel)]="searchingEmail" (input)="applyFilter()" placeholder="Search by email" />
    </div>
    <div *ngIf="totalCompletedRevenue > 0">
  <strong>Total Revenue from Completed Orders:</strong> €{{ totalCompletedRevenue }}
</div>

    <hr />
    <div *ngIf="filteredOrders.length === 0">No orders found.</div>

    <ul>
      <li *ngFor="let order of filteredOrders">
        <strong>Order Number:</strong> {{ order.orderNumber }}<br>
<strong>Status:</strong>
<span *ngIf="!editStatusMap[order._id]">{{ order.status }}</span>
<select *ngIf="editStatusMap[order._id]" [(ngModel)]="order.status">
  <option value="pending">Pending</option>
  <option value="completed">completed</option>
  <option value="cancelled">Cancelled</option>
</select>
<br />

<button *ngIf="!editStatusMap[order._id]" (click)="editStatusMap[order._id] = true">Edit Status</button>
<button *ngIf="editStatusMap[order._id]" (click)="saveOrderStatus(order)">Save</button>
<button *ngIf="editStatusMap[order._id]" (click)="editStatusMap[order._id] = false">Cancel</button>
        <strong>Total Amount:</strong> {{ order.totalAmount }}<br>
        <strong>User Email:</strong> {{ order.user.email }}<br>
        <strong>Created At:</strong> {{ order.user.createdAt }}<br>

        <div *ngIf="order.orderItems?.length">
          <strong>Items:</strong>
          <ul>
            <p *ngFor="let item of order.orderItems">
              {{ item.product?.name }} - quantity : {{ item.quantity }} - €{{ item.price }}
</p>
          </ul>
        </div>
        <hr />
      </li>
    </ul>

  `,
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  allOrders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = '';
  searchingEmail: string = '';
  totalCompletedRevenue: number = 0;
  editStatusMap: { [id: string]: boolean } = {};

  constructor(
    private orderListService: OrderListService,
    private orderItemService: OrderItemService
  ) { }

  ngOnInit(): void {
    //La fork ci permette di gestire più API allo stesso momento
    forkJoin({
      orders: this.orderListService.getOrders(),
      items: this.orderItemService.getOrderItems()
    }).subscribe(({ orders, items }) => {
      // Group orderItems by orderId
      const itemsGroupedByOrderId: Record<string, OrderItem[]> = {};

      for (const item of items) {
        if (!itemsGroupedByOrderId[item.orderId]) {
          itemsGroupedByOrderId[item.orderId] = [];
        }
        itemsGroupedByOrderId[item.orderId].push(item);
      }

      // ...order -> Indica che va a prendere tutti i valori di order anche senza specificarli tutti.
      this.allOrders = orders.map(order => ({
        ...order,
        orderItems: itemsGroupedByOrderId[order._id] || []
      }));

      this.calculateCompletedRevenue();
      this.applyFilter();
    });
  }

  calculateCompletedRevenue(): void {
    this.totalCompletedRevenue = this.allOrders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => {
        const orderTotal = order.orderItems?.reduce((itemSum, item) => {
          return itemSum + (item.quantity * item.price);
        }, 0) || 0;
        return sum + orderTotal;
      }, 0);
  }

  applyFilter(): void {
    this.filteredOrders = this.allOrders.filter(order => {
      const matchesStatus = this.selectedStatus ? order.status === this.selectedStatus : true;
      const matchesEmail = this.searchingEmail
        ? order.user.email.toLowerCase().includes(this.searchingEmail.toLowerCase())
        : true;
      return matchesStatus && matchesEmail;
    });
  }

  saveOrderStatus(order: Order): void {
    this.orderListService.updateOrderStatus(order._id, order.status).subscribe({
      next: () => {
        console.log('Order status updated');
        this.editStatusMap[order._id] = false;
      },
      error: (err) => {
        console.error('Error updating order status:', err);
      }
    });
  }

}
