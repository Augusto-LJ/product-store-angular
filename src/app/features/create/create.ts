import { Component, inject } from '@angular/core';
import { Products } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Form } from '../../shared/components/form/form';
import { Product } from '../../shared/interfaces/product.interface';
import { BackToList } from '../../shared/components/back-to-list/back-to-list';

@Component({
  selector: 'app-create',
  imports: [Form, BackToList],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  productsService = inject(Products);
  matSnackbar = inject(MatSnackBar);
  router = inject(Router);

  onSubmit(product: Product) {
      this.productsService.post(product).subscribe(() => {
        this.matSnackbar.open('Produto criado com sucesso!', 'Fechar');
        this.router.navigateByUrl('/');
    });
  };
}
