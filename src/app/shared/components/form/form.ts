import { Component, EventEmitter, input, Output, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  product = input<Product|null>(null);
  form!: FormGroup;

  @Output() done = new EventEmitter<Product>();
   
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      description: new FormControl<string>(this.product()?.description ?? '', {
        nonNullable: true,
        validators: Validators.required
      })
    });
  };

  onSubmit() {
    const product = this.form.value as Product;
    this.done.emit(product);
  }
}
