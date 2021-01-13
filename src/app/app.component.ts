import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Pessoa } from './models/Pessoa';
import { PessoaService } from './services/pessoa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public pessoas: Pessoa[];
  public displayedColumns: string[] = ['Nome', 'Data', 'CPF', 'Renda', 'Ações'];
  public dataSource: MatTableDataSource<Pessoa>;

  constructor(private service: PessoaService) {}

  public ngOnInit(): void {
    this.loadTableData();
  }

  private loadTableData(): void {
    this.service.fetchPessoas().subscribe((pessoas: Pessoa[]) => {
        this.dataSource = new MatTableDataSource<Pessoa>();

        this.populaTabela(pessoas);
    });
  }

  private populaTabela(dataSource: Pessoa[]): void {
    this.dataSource.data = dataSource;
  }

  private editar(id: number): void {
    alert(`alerta do loko id - ${id}`);
  }

  private deletar(id: number): void {
    this.service.fetchDeletePessoa(id).subscribe(console.log);

    this.loadTableData();
  }
}
