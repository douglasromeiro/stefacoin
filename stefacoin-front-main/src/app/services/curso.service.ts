import Curso from 'src/app/models/curso';
import { Mensagem } from './../models/mensagem';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URL = 'http://localhost:3000/stefanini/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private httpClient: HttpClient) { }

  listar(filtro: Partial<Curso> = {}): Observable<Curso[]>{
    return this.httpClient.get<Curso[]>(URL, {})
  }

  incluir(curso: Curso): Observable<Mensagem>{
    return this.httpClient.post<Mensagem>(URL, curso);
  }

  alterar(curso: Curso, id: number): Observable<Mensagem>{
    return this.httpClient.put<Mensagem>(`${URL}/${id}`, curso);
  }

  obterPorId(id: number){
    return this.httpClient.get<Curso>(`${URL}/${id}`)
  }

  delete(id: number){
    return this.httpClient.delete<Curso>(`${URL}/${id}`)
  }
}
