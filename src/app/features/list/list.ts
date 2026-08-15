import { Component, inject } from '@angular/core';
import { Products } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Card } from './components/card/card';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar produto</h2>
    <mat-dialog-content>
      Deseja realmente deletar o produto?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton (click)="onYes()" cdkFocusInitial color="primary">Sim</button>
      <button matButton (click)="onNo()" color="warn">Não</button>
    </mat-dialog-actions>
  `,
  imports: [MatButtonModule, MatDialogModule],
})

export class ConfirmationDialog {
  matDialogRef = inject(MatDialogRef<ConfirmationDialog>);

  onNo() {
    this.matDialogRef.close(false);
  };

  onYes() {
    this.matDialogRef.close(true);
  };
}

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
  matDialog = inject(MatDialog);

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  };

  onEdit(id: string) {
    this.router.navigate(['/edit-product', id]);
  };

  onDelete(id: string) {
    this.matDialog.open(ConfirmationDialog)
      .afterClosed()
      .subscribe((answer: boolean) => {
        console.log(answer);
      });
  }
}
