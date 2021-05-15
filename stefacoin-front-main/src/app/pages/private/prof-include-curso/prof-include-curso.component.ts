import { Professor } from "src/app/models/professor";
import Curso from "src/app/models/curso";

import { CursoService } from "./../../../services/curso.service";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-prof-include-curso",
  templateUrl: "./prof-include-curso.component.html",
  styleUrls: ["./prof-include-curso.component.css"],
})
export class ProfIncludeCursoComponent implements OnInit {
  curso: Curso[];
  crs: Curso;
  professor: Professor;
  id: any;

  constructor(
    private router: Router,
    private serviceCurso: CursoService,
    private location: Location,
    private toastr: ToastrService,
    private rota: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serviceCurso.listar().subscribe((cur) => (this.curso = cur));

    this.rota.params.subscribe((parametros) => {
      if (parametros["id"]) {
        this.id = parametros["id"];
        this.serviceCurso.obterPorId(this.id).subscribe((edt) => {
          this.crs = edt;
          this.crs.idProfessor = this.id;
        });
      }
    });
  }

  atibuiProfessor() {
    this.serviceCurso.alterar(this.id, this.crs.idProfessor).subscribe(
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
