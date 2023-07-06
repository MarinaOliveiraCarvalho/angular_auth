import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabelaComponent } from './components/tabela/tabela.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { AuthGuard } from './components/guards/auth.guard';

const routes: Routes = [
  {
		path:'', 
    loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule),
	},
	{
		path:'dashboard', 
    loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule),
		canActivate:[AuthGuard]
	},
  {
    path: 'todo',
    component: TabelaComponent,
    data: {
      title: 'todo Page'
    }
  },
  {
    path: 'taks',
    component: IndicadoresComponent,
    data: {
      title: 'taks Page'
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
