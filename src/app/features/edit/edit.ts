import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})

export class Edit {
  productsService = inject(Products);
  matSnackbar = inject(MatSnackBar);
  router = inject(Router);
  product: Product = inject(ActivatedRoute).snapshot.data['product'];
  
  form = new FormGroup({
    title: new FormControl<string>(this.product.title, {
      nonNullable: true,
      validators: Validators.required
    }),
    description: new FormControl<string>(this.product.description, {
      nonNullable: true,
      validators: Validators.required
    })
  });

  onSubmit() {
      this.productsService.put(this.product.id, {
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
    })
    .subscribe(() => {
      this.matSnackbar.open('Produto editado com sucesso!', 'Fechar');

      this.router.navigateByUrl('/');
    });
  };
}
