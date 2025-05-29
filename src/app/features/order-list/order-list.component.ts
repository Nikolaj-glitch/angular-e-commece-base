import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service'; // Modifica il percorso se necessario

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  filteredOrders: any[] = [];
  selectedStatus: string = ''; // Imposta un valore di default se necessario

  constructor(private orderService: OrderService) {}

  // Fetch all orders and filter by selected status
  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.filteredOrders = orders.filter(
        (o) => o.status === this.selectedStatus
      );
    });
  }
}
