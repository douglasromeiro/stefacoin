import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CursoService } from './../../../../services/curso.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Curso from '../../../../models/curso'

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {
  
  constructor(private router: Router, private serviceCurso: CursoService, private location: Location, private toastr: ToastrService) { }
  curso: Curso[]
  
  ngOnInit(): void {
    this.serviceCurso.listar().subscribe(cursos =>
      this.curso = cursos )

  }

  cursoEdit(id: number){
    this.router.navigate(['curso', id])
    }

    deleteCurso(id: number){
      this.serviceCurso.delete(id).subscribe(
        (success) => {
          this.toastr.success("Curso deletado com sucesso!");
        },
        (error) => this.toastr.error("Mão foi possivel excluir o curso..."),
        () =>
          setTimeout(() => {
            this.ngOnInit();
          }, 1000)
      )
    }

    aula(){
      this.router.navigate(['aula'])
    }
  }

