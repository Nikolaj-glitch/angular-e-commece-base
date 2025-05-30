import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Timestamp } from 'rxjs';
import { environment } from '../../../environment';


export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  totalAmount: number;
  status: string;
  user: {
    _id: string;
    email: string;
    isConfirmed: boolean; 
    isEnabled: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  orderItems: any[];
  id: string
}


@Injectable({
  providedIn: 'root'
})

export class OrderListService {


  private apiOrders = environment.apiOrders;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiOrders, { headers }).pipe(
      map(orders =>
        orders.map(order => ({
          _id: order._id,
          orderNumber: order.orderNumber,
          userId: order.userId,
          totalAmount: order.totalAmount,
          status: order.status,
          user: {
            _id: order.user._id,
            email: order.user.email,
            isConfirmed: order.user.isConfirmed,
            isEnabled: order.user.isEnabled,
            isDeleted: order.user.isDeleted,
            createdAt: order.user.createdAt,
            updatedAt: order.user.updatedAt,
          },
          orderItems: order.orderItems,
          id: order.orderItemId
        }))
      )
    );

  }

}
