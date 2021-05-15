import { ActivatedRoute } from "@angular/router";
import { ProfessorService } from "./../../../services/professor.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Professor } from "src/app/models/professor";
import { Location } from "@angular/common";
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  professor: Professor;
  textoBotao: string = "Cadastrar";
  id: any;
  cadForm: FormGroup = new FormGroup({
    nome: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    senha: new FormControl("", Validators.required),
    tipo: new FormControl("", Validators.required),
  });

  constructor(
    private serviceProfessor: ProfessorService,
    private toastr: ToastrService,
    private router: Router,
    private location: Location,
    private rota: ActivatedRoute,
    private AuthService:AuthService
  ) {}

  ngOnInit(): void {

    this.rota.params.subscribe((parametros) => {
      if (parametros["id"]) {
        this.textoBotao = "Atualizar";
        this.id = parametros["id"];
        this.serviceProfessor.obterPorId(this.id).subscribe((edt) => {
          this.professor = edt;
          this.cadForm.setValue({
            nome: this.professor.nome,
            senha:"",
            email: this.professor.email,
            tipo: this.professor.tipo,
          });
        });
      }
    });
  }

  cadastro() {
    if (this.textoBotao == 'Cadastrar') {
      this.professor = {
        nome: this.cadForm.get("nome")?.value,
        email: this.cadForm.get("email")?.value,
        senha: this.cadForm.get("senha")?.value,
        tipo: this.cadForm.get("tipo")?.value,
      };
      this.serviceProfessor.incluir(this.professor).subscribe(
        (success) => {
          this.toastr.success("Cadastrado com sucesso!");
        },
        (error) => this.toastr.error("Preencha os campos que estão em branco"),
        () =>
          setTimeout(() => {
            this.location.back();
          }, 2000)
      );
    } else {
      this.editaProfessor();
    }
  }

  editaProfessor() {
    this.professor = {
      nome: this.cadForm.get("nome")?.value,
      email: this.cadForm.get("email")?.value,
      senha: this.cadForm.get("senha")?.value,
      tipo: this.cadForm.get("tipo")?.value,
    };
    this.serviceProfessor.alterar(this.professor, this.id).subscribe(
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
