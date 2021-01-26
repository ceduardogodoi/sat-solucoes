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
import { distinctUntilChanged } from 'rxjs/operators';

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
    renda: ['', Validators.min(1)]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreatePessoasComponent>
  ) {}

  ngOnInit(): void {
    // Validators.required,
    // Validators.minLength(3),
    // Validators.maxLength(50),
    // Validators.pattern(/[A-z\s]{3,}/g)

    this.nome.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value: string) => {
        if (this.nome.dirty) {
          this.nome.setValidators([
            Validators.required,
            Validators.minLength(3)
          ]);
        }

        this.nome.updateValueAndValidity();
      });
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

  public onNomeChange(): void {
    console.log('onNomeChange');
  }

  public openSnackBar(): void {
    this._snackBar.open('Pessoa cadastrada com sucesso', 'Fechar', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  public onClose(): void {
    console.log(this.nome.errors);

    this.dialogRef.close();
  }

  public onSubmit(form: NgForm): void {
    console.log(this.personForm.value);

    this.openSnackBar();

    form.reset();
  }
}
