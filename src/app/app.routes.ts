import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'consulta', 
    component: ConsultaComponent
  },
  {
    path: '', 
    component: HomeComponent
  }
];