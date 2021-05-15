import  Aula  from 'src/app/models/aula';
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CursoService } from "./../../../services/curso.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AulaService } from "src/app/services/aula.service";



@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  id: any;
  aula: Aula;
  aulas:Array<Aula> = []

  cadAl: FormGroup = new FormGroup({
    nome: new FormControl("", Validators.required),
    duracao: new FormControl("", Validators.required),
    idCurso: new FormControl("", Validators.required),
    topicos: new FormControl("", Validators.required),
  });

  constructor(    private router: Router,
    private serviceCurso: CursoService,
    private toastr: ToastrService,
    private location: Location,
    private rota: ActivatedRoute,
    private serviceAula: AulaService) { }

  ngOnInit(): void {

    this.rota.params.subscribe((parametros) => {
      if(parametros['id']){
        //this.textoBotao = 'Atualizar';
        this.id = parametros['id'];
        this.serviceAula.obterPorId(this.id).subscribe((aulas) => {
          this.aula = aulas;
        })
      }
    })
    
  }

  cadAula(){
    this.aula = {
      nome: this.cadAl.get('nome')?.value,
      duracao: this.cadAl.get('duracao')?.value,
      idCurso: this.cadAl.get('idCurso')?.value,
      topicos: this.cadAl.get('topicos')?.value
    }

    
    this.serviceAula.incluir(this.aula).subscribe(
      (success) => {
        this.toastr.success("Aula cadastrada e incluida ao curso!");
      },
      (error) => this.toastr.error("Preencha os campos que estão em branco"),
      () =>
        setTimeout(() => {
          this.location.back();
        }, 2000)
    );
  }

}
