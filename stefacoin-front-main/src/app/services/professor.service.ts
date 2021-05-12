import { TipoUsuario } from './../../../../stefacoin-main/src/utils/tipo-usuario.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEventPattern, Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';
import { tap } from 'rxjs/operators';


const URL = 'http://localhost:3000/stefanini/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  /*listar(filtro: Partial<Professor>): Observable<Professor> {
    return this.httpClient.get<Professor>(URL, {
      params: TipoUsuario.PROFESSOR,
    });
  }*/

  obter() {
    return this.httpClient.get<Professor[]>(URL)
    .pipe(
      tap(console.log)
    );
  }

  incluir(professor: Professor): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, professor);
  }

  alterar() {}

  excluir() {}
}
