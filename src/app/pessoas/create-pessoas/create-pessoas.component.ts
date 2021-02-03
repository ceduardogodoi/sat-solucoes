import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pessoa } from 'src/app/models/Pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { DialogConfirmacaoComponent } from '../dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-create-pessoas',
  templateUrl: './create-pessoas.component.html',
  styleUrls: ['./create-pessoas.component.scss']
})
export class CreatePessoasComponent implements OnInit {
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
    private _service: PessoaService,
    @Inject(MAT_DIALOG_DATA) private _data: Pessoa
  ) {}

  ngOnInit(): void {
    if (this._data) {
      this.nome.setValue(this._data.nome);
      this.cpf.setValue(this._data.cpf);
      this.renda.setValue(this._data.renda);
      this.dataCadastro.setValue(this._data.dataCadastro);
    }
  }

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
    this._snackBar.open(
      `${nome} ${this._data ? 'atualizado(a)' : 'cadastrado(a)'} com sucesso`,
      'Fechar',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
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
    const pessoa: Pessoa = {
      id: this._data?.id,
      cpf: this.cpf.value,
      nome: this.nome.value,
      renda: this.renda.value,
      dataCadastro: this.dataCadastro.value
    };

    if (this._data?.id) {
      this._service
        .updatePessoa(pessoa)
        .subscribe(pessoa => this.openSnackBar(pessoa.nome));
    } else {
      this._service
        .createPessoa(this.personForm.value as Pessoa)
        .subscribe(pessoa => this.openSnackBar(pessoa.nome));
    }

    form.reset();
  }
}
