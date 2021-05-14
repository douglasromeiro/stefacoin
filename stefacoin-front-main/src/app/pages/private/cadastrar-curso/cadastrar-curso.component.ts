import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CursoService } from "./../../../services/curso.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import Curso from "src/app/models/curso";

@Component({
  selector: "app-cadastrar-curso",
  templateUrl: "./cadastrar-curso.component.html",
  styleUrls: ["./cadastrar-curso.component.css"],
})
export class CadastrarCursoComponent implements OnInit {
  id: any;
  curso: Curso;
  textoBotao: string = "Cadastrar";
  cadCurso: FormGroup = new FormGroup({
    nome: new FormControl("", Validators.required),
    descricao: new FormControl("", Validators.required),
  });

  constructor(
    private router: Router,
    private serviceCurso: CursoService,
    private toastr: ToastrService,
    private location: Location,
    private rota: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.rota.params.subscribe((parametros) => {
      if (parametros["id"]) {
        this.textoBotao = "Editar";
        this.id = parametros["id"];
        this.serviceCurso.obterPorId(this.id).subscribe((edt) => {
          this.curso = edt;
          this.cadCurso.setValue({
            nome: this.curso.nome,
            descricao: this.curso.descricao,
          });
        });
      }
    });
  }

  cadastraCurso() {
    if(this.textoBotao == 'Cadastrar') {
      this.curso = {
        nome: this.cadCurso.get("nome")?.value,
        descricao: this.cadCurso.get("descricao")?.value,
      };
      this.serviceCurso.incluir(this.curso).subscribe(
        (success) => {
          this.toastr.success("Cadastrado com sucesso!");
        },
        (error) => this.toastr.error("Preencha os campos que estão em branco"),
        () =>
          setTimeout(() => {
            this.location.back();
          }, 2000)
      );
    }else{
      this.editaCurso();
    }
  }

  editaCurso() {
    this.curso = {
      nome: this.cadCurso.get("nome")?.value,
      descricao: this.cadCurso.get("descricao")?.value,
    };
    this.serviceCurso.alterar(this.curso, this.id).subscribe(
      (success) => {
        this.toastr.success("Atualizado com sucesso!");
      },
      (error) => this.toastr.error("Preencha os campos que estão em branco"),
      () =>
        setTimeout(() => {
          this.location.back();
        }, 2000)
    );
  }
}
