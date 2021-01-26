import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateAfterDirty } from 'src/app/validators/validate-after-dirty';

@Component({
  selector: 'app-create-pessoas',
  templateUrl: './create-pessoas.component.html',
  styleUrls: ['./create-pessoas.component.scss']
})
export class CreatePessoasComponent implements OnInit {
  public personForm: FormGroup = this._formBuilder.group({
    nome: [''],
    dataCadastro: [''],
    cpf: [''],
    renda: ['']
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreatePessoasComponent>
  ) {}

  private _applyValidations(): void {
    validateAfterDirty(this.nome, [
      Validators.required,
      Validators.pattern(/[A-z\s]{3,}/)
    ]);

    validateAfterDirty(this.cpf, [
      Validators.required,
      Validators.pattern(/[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}/)
    ]);

    validateAfterDirty(this.renda, [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/[0-9\.?,?]+/)
    ]);

    validateAfterDirty(this.dataCadastro, [Validators.required]);
  }

  public ngOnInit(): void {
    this._applyValidations();
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

  public openSnackBar(): void {
    this._snackBar.open('Pessoa cadastrada com sucesso', 'Fechar', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  public onClose(): void {
    console.log(this.cpf.errors);

    this.dialogRef.close();
  }

  public onSubmit(form: NgForm): void {
    console.log(this.personForm.value);

    this.openSnackBar();

    form.reset();
  }
}
