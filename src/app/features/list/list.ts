import { Component, inject } from '@angular/core';
import { Products } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Card } from './components/card/card';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  imports: [Card, RouterLink, MatButtonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})

export class List {

  products: Product[] = [];

  productsService = inject(Products);
  router = inject(Router);

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(id: string) {
    this.router.navigate(['/edit-product', id]);
  }
}
