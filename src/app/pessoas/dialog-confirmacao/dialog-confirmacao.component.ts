import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePessoasComponent } from '../create-pessoas/create-pessoas.component';

@Component({
  selector: 'app-dialog-confirmacao',
  templateUrl: './dialog-confirmacao.component.html',
  styleUrls: ['./dialog-confirmacao.component.scss']
})
export class DialogConfirmacaoComponent {
  constructor(
    private _dialogRef: MatDialogRef<DialogConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA)
    private _dialogCreatePessoas: MatDialogRef<CreatePessoasComponent>
  ) {}

  public onClose() {
    this._dialogRef.close();

    this._dialogCreatePessoas.close();
  }
}
