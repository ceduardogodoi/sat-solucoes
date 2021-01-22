import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { confirmaSenhaValidator } from '../../validators/confirmaSenha.validator';
import { rendaValidator } from '../../validators/renda.validator';

@Component({
  selector: 'app-create-pessoas',
  templateUrl: './create-pessoas.component.html',
  styleUrls: ['./create-pessoas.component.scss']
})
export class CreatePessoasComponent {
  public personForm: FormGroup = this._formBuilder.group(
    {
      nome: [''],
      dataCadastro: [''],
      cpf: [''],
      renda: ['', [rendaValidator()]],
      senha: [''],
      confirmarSenha: ['']
    },
    { validators: confirmaSenhaValidator }
  );

  public get controls(): { [key: string]: AbstractControl } {
    return this.personForm.controls;
  }

  constructor(private _formBuilder: FormBuilder) {}

  public onSubmit(): void {
    console.log('FormGroup errors:', this.personForm.errors);
    console.log(
      'FormControl senha errors:',
      this.personForm.controls.senha.errors
    );
    console.log(
      'FormControl confirmaSenha errors:',
      this.personForm.controls.confirmarSenha.errors
    );
  }
}
