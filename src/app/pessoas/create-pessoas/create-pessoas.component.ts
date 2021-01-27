import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public dialogRef: MatDialogRef<CreatePessoasComponent>
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

  public openSnackBar(): void {
    this._snackBar.open('Pessoa cadastrada com sucesso', 'Fechar', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private _hasFilledFields(): boolean {
    for (const key in this.personForm.value) {
      const value: string = this.personForm.value[key] as string;

      if (value) {
        return true;
      }
    }

    return false;
  }

  public onClose(): void {
    if (this._hasFilledFields()) {
      const shouldClose: boolean = confirm('Deseja realmente fechar?');

      if (shouldClose) {
        this.dialogRef.close();
      }

      return;
    }

    this.dialogRef.close();
  }

  public onSubmit(form: NgForm): void {
    this.openSnackBar();

    form.reset();
  }
}
