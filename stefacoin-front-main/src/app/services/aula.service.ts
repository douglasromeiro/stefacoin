import { Observable } from 'rxjs';
import { Mensagem } from './../models/mensagem';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Aula from '../models/aula';

const URL = 'http://localhost:3000/stefanini/aula';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private httpClient: HttpClient) { }

  listar(filtro: Partial<Aula> = {}): Observable<Aula[]>{
    return this.httpClient.get<Aula[]>(URL, {})
  }

  incluir(aula: Aula): Observable<Mensagem>{
    return this.httpClient.post<Mensagem>(URL, aula);
  }

  alterar(aula: Aula[], id: number): Observable<Mensagem>{
    return this.httpClient.put<Aula>(`${URL}/${id}`, aula);
  }

  obterPorId(id: number){
    return this.httpClient.get<Aula>(`${URL}/${id}`)
  }

  delete(id: number){
    return this.httpClient.delete<Aula>(`${URL}/${id}`)
  }
}
