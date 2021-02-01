import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pessoa } from 'src/app/models/Pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { DialogConfirmacaoComponent } from '../dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-create-pessoas',
  templateUrl: './create-pessoas.component.html',
  styleUrls: ['./create-pessoas.component.scss']
})
export class CreatePessoasComponent {
  public personForm: FormGroup = this._formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    dataCadastro: ['', Validators.required],
    cpf: [
      '',
      [
        Validators.required,
        Validators.pattern(/[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}/)
      ]
    ],
    renda: ['', [Validators.required, Validators.min(1)]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<CreatePessoasComponent>,
    private _dialog: MatDialog,
    private _service: PessoaService
  ) {}

  public get nome(): AbstractControl {
    return this.personForm.controls.nome;
  }

  public get dataCadastro(): AbstractControl {
    return this.personForm.controls.dataCadastro;
  }

  public get cpf(): AbstractControl {
    return this.personForm.controls.cpf;
  }

  public get renda(): AbstractControl {
    return this.personForm.controls.renda;
  }

  public openSnackBar(nome: string): void {
    this._snackBar.open(`${nome} cadastrado(a) com sucesso`, 'Fechar', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private _hasFilledFields(): boolean {
    for (const key in this.personForm.value) {
      const value = this.personForm.value[key] as string;

      if (value) {
        return true;
      }
    }

    return false;
  }

  public onClose(): void {
    if (this._hasFilledFields()) {
      this._dialog.open(DialogConfirmacaoComponent, {
        data: this._dialogRef
      });

      return;
    }

    this._dialogRef.close();
  }

  public onSubmit(form: NgForm): void {
    this._service
      .createPessoa(this.personForm.value as Pessoa)
      .subscribe(pessoa => this.openSnackBar(pessoa.nome));

    form.reset();
  }
}
