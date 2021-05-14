import  Curso  from 'src/app/models/curso';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CursoService } from './../../../services/curso.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edita-curso',
  templateUrl: './edita-curso.component.html',
  styleUrls: ['./edita-curso.component.css']
})
export class EditaCursoComponent implements OnInit {

  id: any
  curso: Curso;
  edt: Curso[];


  constructor(
    private router: Router,
    private serviceCurso: CursoService,
    private toastr: ToastrService,
    private location: Location,
    private rota: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.rota.params.subscribe( parametros =>{
        this.id = parametros['id'];
        const reqCurso = this.serviceCurso.obterPorId(this.id).subscribe(
          edt  => {
            this.curso = edt
          }
        )
    })
  }

  editaCurso(){
    this.serviceCurso.alterar(this.curso, this.id).subscribe(
      (success) => {
        this.toastr.success("Cadastrado com sucesso!");
      },
      (error) => this.toastr.error("Preencha os campos que estão em branco"),
      () =>
        setTimeout(() => {
          this.location.back();
        }, 2000)
    );
  }
}
