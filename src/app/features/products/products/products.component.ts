import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCardModule
  ],
  styleUrl: './products.component.scss',
  template: `
  <button (click)="logout()">logout</button>
  <div>
    <h1>Prodotti</h1>


    <mat-card class="maxSizeMatCard">
      <mat-card-header>
      <mat-card-title>Nome del prodotto</mat-card-title>
      <mat-card-subtitle>Categoria del prodotto</mat-card-subtitle>
      </mat-card-header>
      <!-- esempio immagine -->
      <img mat-card-image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.ortopedia24.it%2Fwp-content%2Fuploads%2F2016%2F12%2FBastoneLegno_Donna.jpg&f=1&nofb=1&ipt=4b9726599f306c3ea32bfeddf8f079b264fe222500a6dd473aebb84438fb0874">

      <mat-card-content>
      <p>  Descrizione prodotto </p>
      </mat-card-content>
      <mat-card-actions>
         <button mat-button>add to cart</button>
      </mat-card-actions>
    </mat-card>
  </div>
  `
})
export class ProductsComponent {
  private router: Router = new Router;
  logout() {
    localStorage.removeItem("token");
    this.router.navigate([''])
  }
}
