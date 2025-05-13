import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  styleUrl: './products.component.scss',
  template: `
  <button (click)="logout()">logout</button>
  <div>
    <h1>Prodotti</h1>
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
