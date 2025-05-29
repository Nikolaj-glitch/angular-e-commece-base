import { Component, OnInit } from '@angular/core';
import { Order, OrderListService } from './order-list.services';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor
  ],
  template: `
    <div>
    <label for="statusFilter"> Filter by Status: </label>
      <select id="statusFilter"[(ngModel)]="selectedStatus"(change)="applyFilter()" >
      <option value=""> All </option>
        <option value="pending" > Pending </option>
        <option value="completed" > Completed </option>
        <option value="cancelled" > Cancelled </option>
 </select>
  </div>
<div>
<input type="text" [(ngModel)]="searchingEmail" (input)="applyFilter()" placeholder="Cerca utente" />
</div>
  <hr/>

  <div *ngIf="filteredOrders.length === 0" >
No orders found.
</div>

<ul>
<li *ngFor="let order of filteredOrders" >
<strong>Order Number: </strong> {{ order.orderNumber }}<br>
<strong>Status: </strong> {{ order.status }}<br >
<strong>Total Amount: </strong> {{ order.totalAmount }}<br>
<strong>User Email: </strong> {{ order.user.email }}<br>
<strong>Created At: </strong> {{ order.user.createdAt }}<br>
<hr />
</li>
</ul>
   `,
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  allOrders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = '';
  searchingEmail: string = '';
  order: any;

  constructor(private orderListService: OrderListService) { }

  ngOnInit(): void {
    this.orderListService.getOrders().subscribe((orders: Order[]) => {
      this.allOrders = orders;
      this.applyFilter();
    });
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

}
