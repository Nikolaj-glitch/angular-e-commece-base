import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor } from '@angular/common';
import { Product, ProductService } from './products.services';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatDividerModule,
    MatCardModule,
    NgFor
  ],
  styleUrl: './products.component.scss',
  template: `
    <div>
  <button (click)="logout()">Logout</button>
  <h1>Prodotti</h1>

  <div class="product-grid">
    <mat-card class="product-card" *ngFor="let product of products">
      <mat-card-header>
        <mat-card-title>{{ product.name }}</mat-card-title>
        <mat-card-subtitle>{{ product.price }}</mat-card-subtitle>
      </mat-card-header>

      <img mat-card-image [src]="product.imageUrl" alt="{{ product.name }}">

      <mat-card-content>
        <p>{{ product.description }}</p>
        <p>Disponibilità: {{ product.stock }}</p>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button>Aggiungi al carrello</button>
      </mat-card-actions>
    </mat-card>
  </div>
</div>
  `
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService, //
    private router: Router
  ) { }

  //Quando viene inizializzata la pagina
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error("Errore: ", err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
}
