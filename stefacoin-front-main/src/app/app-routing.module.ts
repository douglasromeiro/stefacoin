import { ProfIncludeCursoComponent } from './pages/private/prof-include-curso/prof-include-curso.component';
import { AulaComponent } from './pages/private/aula/aula.component';
import { EditaCursoComponent } from './pages/private/edita-curso/edita-curso.component';
import { CadastrarCursoComponent } from './pages/private/cadastrar-curso/cadastrar-curso.component';
import { ListarCursoComponent } from './pages/private/curso/listar-curso/listar-curso.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './pages/private/home/home.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: 'nova-conta',
    component: CadastroComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'professores-lista',
    canActivate: [AuthGuardService],
    component: ListarProfessorComponent,
  },
  {
    path:'professor-edit/:id',
    canActivate: [AuthGuardService],
    component: CadastroComponent,
  },
  {
    path:'atbProf/:id',
    canActivate: [AuthGuardService],
    component: ProfIncludeCursoComponent,
  },
  {
    path:'curso-listar',
    canActivate: [AuthGuardService],
    component: ListarCursoComponent,
  },
  {
    path:'aula',
    canActivate: [AuthGuardService],
    component: AulaComponent,
  },
  {
    path:'curso-cad',
    canActivate: [AuthGuardService],
    component: CadastrarCursoComponent,
  },
  {
    path:'curso/:id',
    canActivate: [AuthGuardService],
    component: CadastrarCursoComponent,
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
