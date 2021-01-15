import { Component, OnInit } from '@angular/core';

import { Pessoa } from 'src/app/models/Pessoa';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';

@Component({
  selector: 'app-create-pessoas',
  templateUrl: './create-pessoas.component.html',
  styleUrls: ['./create-pessoas.component.scss'],
})
export class CreatePessoasComponent implements OnInit {
  public pessoa: Pessoa = new Pessoa();

  constructor(private _cpfPipe: CpfPipe) {}

  ngOnInit(): void {}

  public print(): void {
    console.log(this.pessoa);
  }
}
