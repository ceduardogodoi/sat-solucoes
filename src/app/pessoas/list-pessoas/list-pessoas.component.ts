import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
    this.dataSource$ = this._service.getPessoas();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public openDialog(): void {
    this._dialog
      .open(CreatePessoasComponent, {
        width: '60%',
        disableClose: true
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  public deletePessoa(id: number): void {
    this._service.deletePessoa(id).subscribe();

    this.loadData();
  }

  public editPessoa(pessoa: Pessoa): void {
    this._dialog
      .open(CreatePessoasComponent, {
        width: '60%',
        disableClose: true,
        data: pessoa
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }
}
