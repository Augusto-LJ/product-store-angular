import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Form } from '../../shared/components/form/form';
import { BackToList } from '../../shared/components/back-to-list/back-to-list';

@Component({
  selector: 'app-edit',
  imports: [Form, BackToList],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})

export class Edit {
  productsService = inject(Products);
  matSnackbar = inject(MatSnackBar);
  router = inject(Router);
  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  onSubmit(product: Product) {
      this.productsService.put(this.product.id, product).subscribe(() => {
        this.matSnackbar.open('Produto editado com sucesso!', 'Fechar');
        this.router.navigateByUrl('/');
    });
  };
}
