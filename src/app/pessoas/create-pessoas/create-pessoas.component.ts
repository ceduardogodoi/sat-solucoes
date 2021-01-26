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
import { rendaValidator } from '../../validators/renda.validator';

@Component({
  selector: 'app-create-pessoas',
  templateUrl: './create-pessoas.component.html',
  styleUrls: ['./create-pessoas.component.scss']
})
export class CreatePessoasComponent {
  public personForm: FormGroup = this._formBuilder.group({
    nome: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/[A-z\s]{3,}/g)
      ]
    ],
    dataCadastro: [''],
    cpf: [''],
    renda: ['', [rendaValidator()]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreatePessoasComponent>
  ) {}

  public get controls(): { [key: string]: AbstractControl } {
    return this.personForm.controls;
  }

  public openSnackBar(): void {
    this._snackBar.open('Pessoa cadastrada com sucesso', 'Fechar', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  public onClose(): void {
    console.log(this.controls.nome.errors);

    this.dialogRef.close();
  }

  public onSubmit(form: NgForm): void {
    console.log(this.personForm.value);

    this.openSnackBar();

    form.reset();
  }
}
