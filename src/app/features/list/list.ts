import { Component, inject } from '@angular/core';
import { Products } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Card } from './components/card/card';

@Component({
  selector: 'app-list',
  imports: [Card],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})

export class List {

  products: Product[] = [];

  productsService = inject(Products);

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
}
