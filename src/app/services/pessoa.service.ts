import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/Pessoa';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  constructor(private http: HttpClient) {}

  fetchPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>('http://localhost:8080/pessoa');
  }

  fetchDeletePessoa(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/pessoa/${id}`);
  }
}
