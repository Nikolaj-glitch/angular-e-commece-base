import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from '../../../../environment';

export interface Product {
  _id: string,
  name: string;
  description: string;
  price: number;
  categoryId: string,
  stock: number;
  imageUrl: string;
  category: {
    _id: string;
    name: string;
    description: string;
  };
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
          _id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          categoryId: p.categoryId,
          imageUrl: p.imageUrl,
          category: {
            _id: p.id,
            name: p.name,
            description: p.description
          }
        }))
      ),
      catchError(error => {
        console.error('API error:', error);
        return throwError(() => error);
      })
    );
  }
  //Aggiorniamo il prodotto
  updateProduct(productId: string, productData: Partial<Product>): Observable<any> {
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.APIurl}/ ${productId}`;
    return this.http.put(url, productData, { headers }).pipe(
      catchError(
        error => {
          console.error("Errore durante l'aggiornamento del prodotto", error)
          return throwError(() => error)
        }
      )
    )
  }
}
