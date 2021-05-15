import { Tables } from './../utils/tables.enum';
import Entity from "../entities/entity";

export default class Aula extends Entity {
  nome: string;
  duracao: number;
  idCurso: number;
  topicos: string[];

  constructor() {
    super()
  }
}
