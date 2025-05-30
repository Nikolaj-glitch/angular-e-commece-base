import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from '../../../environment';


export interface Category {
  id: string,
  name: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})


export class Getcategory {
  private categoryAPI = environment.apiCategories;

  constructor(private http: HttpClient) { }

  getCategory(): Observable<Category[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(this.categoryAPI, { headers }).pipe(
      map(
        categories =>
          categories.map(
            c => ({
              id: c.id,
              name: c.name,
              description: c.description
            })
          )
      ),
      catchError(error => {
        console.error('API error:', error);
        return throwError(() => error);
      })
    )
  }
}


