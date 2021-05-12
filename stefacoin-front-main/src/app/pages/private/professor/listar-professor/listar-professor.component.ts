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

  professor: Professor[];

  constructor(private serviceProfessor: ProfessorService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.serviceProfessor.obter().subscribe(
      professores => 
       this.professor = professores);
  }



}
