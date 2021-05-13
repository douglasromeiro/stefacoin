import e from 'express';
import express, { json, NextFunction, Request, Response } from 'express';
import AlunoController from '../controllers/aluno.controller';
import Aluno from '../entities/aluno.entity';
import Exception from '../utils/exceptions/exception';
import Mensagem from '../utils/mensagem';

const router = express.Router();

router.post('/aluno', async (req: Request, res: Response, next: NextFunction) => {
  const alunos: Aluno[] = await new AlunoController().listar();
  const listEmail = alunos.map(function(item){
    return {email: item.email}
  })
  try {
    if(listEmail.indexOf(req.body.email)){
      console.log("Já existe um usuário com esse e-mail cadastrado!");
      stop()
    }
    const mensagem: Mensagem = await new AlunoController().incluir(req.body);
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.put('/aluno/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const mensagem: Mensagem = await new AlunoController().alterar(Number(id), req.body);
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.delete('/aluno/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const mensagem: Mensagem = await new AlunoController().excluir(Number(id));
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.get('/aluno/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const aluno: Aluno = await new AlunoController().obterPorId(Number(id));
    res.json(aluno);
  } catch (e) {
    next(e);
  }
});

router.get('/aluno', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alunos: Aluno[] = await new AlunoController().listar();
    res.json(alunos);
  } catch (e) {
    next(e);
  }
});

export default router;
