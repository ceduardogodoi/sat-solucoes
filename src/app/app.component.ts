import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from './models/Pessoa';
import { PessoaService } from './services/pessoa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public displayedColumns: string[] = ['Nome', 'Data', 'CPF', 'Renda', 'Ações'];
  public dataSource: Observable<Pessoa[]>;

  constructor(private _service: PessoaService) {}

  private loadData(): void {
    this.dataSource = this._service.fetchPessoas();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public remove(id: number): void {
    this._service.fetchDeletePessoa(id).subscribe();

    this.loadData();
  }

  public edit(id: number): void {
    alert('edit');
  }
}
