import { Component, inject, Service } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

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

@Service()
export class ConfirmationDialogService {
    matDialog = inject(MatDialog);

    openDialog(): Observable<boolean> {
        return this.matDialog.open(ConfirmationDialog).afterClosed();
    }
}
