import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-pessoas',
  templateUrl: './create-pessoas.component.html',
  styleUrls: ['./create-pessoas.component.scss']
})
export class CreatePessoasComponent {
  public personForm: FormGroup = this._formBuilder.group({
    nome: [''],
    dataCadastro: [''],
    cpf: [''],
    renda: ['']
  });

  public get controls(): { [key: string]: AbstractControl } {
    return this.personForm.controls;
  }

  constructor(private _formBuilder: FormBuilder) {}

  public onSubmit(): void {
    console.log(this.personForm.errors);
  }
}
