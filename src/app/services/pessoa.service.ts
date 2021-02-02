import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/Pessoa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  constructor(private _http: HttpClient) {}

  public getPessoas(): Observable<Pessoa[]> {
    return this._http.get<Pessoa[]>(`${environment.apiUrl}/pessoa`);
  }

  public createPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this._http.post<Pessoa>(`${environment.apiUrl}/pessoa`, pessoa);
  }

  public updatePessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this._http.put<Pessoa>(
      `${environment.apiUrl}/pessoa/${pessoa.id}`,
      pessoa
    );
  }

  public deletePessoa(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/pessoa/${id}`);
  }
}
