import Aula from "./aula";

export default interface Curso{
    nome: string;
    descricao: string;
    idProfessor?: number;
    aulas?: Aula[];
}