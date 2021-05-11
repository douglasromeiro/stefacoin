import { filter } from 'rxjs/operators';

import { ProfessorService } from './../../../services/professor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';
import { Location } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
    professor: Professor;
    cadForm: FormGroup = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
    })



  constructor(private serviceProfessor: ProfessorService,
     private toastr: ToastrService,
      private router: Router,
      private location: Location) { 

  }


  ngOnInit(): void {

    }

  cadastro(){
    
      this.professor = {
        nome: this.cadForm.get('nome')?.value,
        email: this.cadForm.get('email')?.value,
        senha: this.cadForm.get('senha')?.value,
        tipo: this.cadForm.get('tipo')?.value,
      }
      this.serviceProfessor.incluir(this.professor).subscribe(
        success => { this.toastr.success('Cadastrado com sucesso!');
      },
        error => this.toastr.error('Preencha os campos que estão em branco'),
        () => setTimeout(() => {
          this.location.back();
        }, 2000)
      )
    }
}