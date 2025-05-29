import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environment';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  stock: number;
  imageUrl: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface OrderItem {
  _id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  product: Product;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private APIurl = environment.apiItems;

  constructor(private http: HttpClient) { }

  getOrderItems(): Observable<OrderItem[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(this.APIurl, { headers }).pipe(
      map(items =>
        items.map(i => ({
          _id: i._id,
          orderId: i.orderId,
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
          createdBy: i.createdBy,
          createdAt: i.createdAt,
          updatedAt: i.updatedAt,
          __v: i.__v,
          id: i.id,
          product: {
            _id: i.product._id,
            name: i.product.name,
            description: i.product.description,
            price: i.product.price,
            categoryId: i.product.categoryId,
            stock: i.product.stock,
            imageUrl: i.product.imageUrl,
            createdBy: i.product.createdBy,
            createdAt: i.product.createdAt,
            updatedAt: i.product.updatedAt,
            __v: i.product.__v,
            id: i.product.id
          }
        }))
      ),
      catchError(error => {
        console.error('Errore API ordine:', error);
        return throwError(() => error);
      })
    );
  }
}
