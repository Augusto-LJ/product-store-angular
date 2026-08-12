import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Products } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  productsService = inject(Products);
  matSnackbar = inject(MatSnackBar);
  router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    })
  });

  onSubmit() {
      this.productsService.post({
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
    })
    .subscribe(() => {
      this.matSnackbar.open('Produto criado com sucesso!', 'Fechar');

      this.router.navigateByUrl('/');
    });
  };
}
