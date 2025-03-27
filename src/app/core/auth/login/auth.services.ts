import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root', //Angular registra AuthService disponibile ovunque nell'app
})
export class AuthService {
  private apiUrl = ''; //nostra API

  constructor(private http: HttpClient) {}

  //invia credenziali al servere e salva il JWT token
  login(credentials: { name: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  //Recupera il token dal localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //Rimuove il token quando ci si disconnette
  logout() {
    localStorage.removeItem('token');
  }

  //Controlla se utente è loggato
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
