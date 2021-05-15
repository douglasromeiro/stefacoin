import { ActivatedRoute } from '@angular/router';
import { TipoUsuario } from './../../../../../../../stefacoin-main/src/utils/tipo-usuario.enum';
import { ProfessorService } from './../../../../services/professor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Professor } from './../../../../models/professor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {

  professor: Professor[]
  edtProfessor: Professor;
  textoBotao: string = 'Cadastrar';
  id: any;

  constructor(private serviceProfessor: ProfessorService,
              private router: Router,
              private toastr: ToastrService,
              private rota: ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceProfessor.listar().subscribe(
      professores => 
       this.professor = professores);

       this.rota.params.subscribe((parametros) => {
         if(parametros['id']){
           this.textoBotao = 'Atualizar';
           this.id = parametros['id'];
           this.serviceProfessor.obterPorId(this.id).subscribe((edt) => {
             this.edtProfessor = edt;
           })
         }
       })
  }


  atualizarProfessor(id:number){
    this.router.navigate(['professor-edit', id])
  }

  removerProfessor(id:number){

    this.serviceProfessor.delete(id).subscribe(
      (success) => {
        this.toastr.success("Professor deletado com sucesso!");
      },
      (error) => this.toastr.error("Não foi possivel excluir o professor..."),
      () =>
        setTimeout(() => {
          this.ngOnInit();
        }, 1000)
    )
  }

  atribuirCurso(id: number){
    this.router.navigate(['atbProf', id])
  }


}
