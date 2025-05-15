import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from '../../../../environment';

export interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  //Usiamo l'API dedicata ai prodotti
  private APIurl = environment.apiProducts;

  constructor(private http: HttpClient) { }

  //HTTP headers ed autorizzazioni di tipo Bearer. Il token è salvato nel localstorage.
  getProducts(): Observable<Product[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    //Implementiamo la richiesta di get e diamo anche l'autorizzazione.
    return this.http.get<any[]>(this.APIurl, { headers }).pipe(
      map(products =>
        products.map(p => ({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          imageUrl: p.imageUrl
        }))
      ),
      catchError(error => {
        console.error('API error:', error);
        return throwError(() => error);
      })
    );
  }
}
