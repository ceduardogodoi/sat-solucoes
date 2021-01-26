import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { Pessoa } from 'src/app/models/Pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

import { CreatePessoasComponent } from '../create-pessoas/create-pessoas.component';

@Component({
  selector: 'app-list-pessoas',
  templateUrl: './list-pessoas.component.html',
  styleUrls: ['./list-pessoas.component.scss']
})
export class ListPessoasComponent implements OnInit {
  public displayedColumns: string[] = ['Nome', 'Data', 'CPF', 'Renda', 'Ações'];
  public dataSource$: Observable<Pessoa[]>;

  constructor(private _service: PessoaService, private _dialog: MatDialog) {}

  private loadData(): void {
    this.dataSource$ = this._service.fetchPessoas();
  }

  public ngOnInit(): void {
    this.loadData();

    this.openDialog();
  }

  public openDialog(): void {
    this._dialog.open(CreatePessoasComponent, {
      width: '70%',
      disableClose: true
    });
  }
}
