import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor } from '@angular/common';
import { Product, ProductService } from './products.services';
import { Category, Getcategory } from '../../categories/categoriesAPI';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatDividerModule,
    MatCardModule,
    FormsModule,
    NgFor
  ],

  styleUrl: './products.component.scss',
  template: `
    <div>
  <button (click)="logout()">Logout</button>
  <h1>Prodotti</h1>
  <!-- filtro -->
<div class="controls">

  <input type="text" [(ngModel)]="searchTerm" placeholder="Cerca prodotto" />
  <select [(ngModel)]="sortOption">
    <option value="">Ordina per</option>
    <option value="name">Nome</option>
    <option value="price">Prezzo</option>
  </select>

  <select [(ngModel)]="selectedCategory">
     <option [ngValue]="null">Categoria</option>
    <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
  </select>
</div>

   <!-- Card per i prodotti -->
  <div class="product-grid">
<mat-card class="product-card" *ngFor="let product of filteredProducts">
      <mat-card-header>
        <mat-card-title>{{ product.name }}</mat-card-title>
        <mat-card-subtitle>{{ product.price }}</mat-card-subtitle>
      </mat-card-header>
      <img class="card-image " [src]="product.imageUrl" alt="{{ product.name }}">

      <mat-card-content>
        <p>Categoria: {{ getCategoryName(product.categoryId) }}</p>
        <p>{{ product.description }}</p>
        <p>Disponibilità: {{ product.stock }}</p>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button>Modifica</button>
      </mat-card-actions>
    </mat-card>
  </div>
</div>
  `
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];

  //Variabili per i filtri ed ordinamenti
  searchTerm: string = '';
  sortOption: string = '';
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private getCategorService: Getcategory,
    private router: Router
  ) { }

  //ngOnInit -> All'avvio della pagina
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error("Errore prodotti: ", err)
    });

    this.getCategorService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error("Errore categorie: ", err)
    });
  }

  //Otteniamo l'id corretto della categoria
  getCategoryName(categoryId: string): string {
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Categoria sconosciuta';
  }


  //Filtro prodotti
  get filteredProducts(): Product[] {
    let filtered = this.products;

    // Filter by search term
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by selected category
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === this.selectedCategory);
    }

    // Sort
    if (this.sortOption === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'price') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }
    return filtered;
  }


  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
}
