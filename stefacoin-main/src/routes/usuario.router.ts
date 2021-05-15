import { TipoUsuario } from "./../utils/tipo-usuario.enum";
import { Professor } from "src/app/models/professor";
import { Mensagem } from "./../../../stefacoin-front-main/src/app/models/mensagem";
import express, { NextFunction, Request, Response } from "express";
import ProfessorController from "../controllers/professor.controller";
import Usuario from "../entities/usuario.entity";

const router = express.Router();

router.post(
  "/user",
  async (req: Request, res: Response, next: NextFunction) => {
    const usuario: Usuario[] = req.body.tipo;
    if (req.body.tipo === 1) {
      const professores: Professor[] = await new ProfessorController().listar();
      const listEmail = professores.map(function (item) {
        return { email: item.email };
      });
      try {
        if (listEmail.indexOf(req.body.email)) {
          console.log("Já existe um usuário com esse e-mail cadastrado!");
        }
        const mensagem: Mensagem = await new ProfessorController().incluir(
          req.body
        );
        res.json(mensagem);
      } catch (e) {
        next(e);
      }
    }
  }
);
