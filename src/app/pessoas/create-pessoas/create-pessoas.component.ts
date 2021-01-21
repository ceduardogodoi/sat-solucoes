import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) {}

  public onSubmit(): void {
    console.log(this.personForm.value);
  }
}
