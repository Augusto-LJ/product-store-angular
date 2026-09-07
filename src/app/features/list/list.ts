import { Component, inject, signal } from '@angular/core';
import { Products } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Card } from './components/card/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog';
import { NoItems } from './components/no-items/no-items';

@Component({
  selector: 'app-list',
  imports: [Card, RouterLink, MatButtonModule, NoItems],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})

export class List {

  products = signal<Product[]>(inject(ActivatedRoute).snapshot.data['products'] || []);

  productsService = inject(Products);
  router = inject(Router);
  confirmationDialogService = inject(ConfirmationDialogService);

  onEdit(id: string) {
    this.router.navigate(['/edit-product', id]);
  };

  onDelete(id: string) {
   this.confirmationDialogService
    .openDialog()
    .pipe(filter((answer: boolean) => answer === true))
    .subscribe(() => {
      this.productsService.delete(id).subscribe(() => {
        this.productsService.getAll().subscribe((products: Product[]) => {
          this.products.set(products);
        });
      });
    });
  }
}
