import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabelaComponent } from './components/tabela/tabela.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { DefaultLayoutComponent } from './components/default/default-layout.component';
import { AuthGuard } from './components/guards/auth.guard';

const routes: Routes = [
  {
		//whe app starting, it will navigate to login page
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


  
  // {
  //   path: '',
  //   component: DefaultLayoutComponent,
  //   data: {
  //     title: 'DefaultLayoutComponent Page'
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
