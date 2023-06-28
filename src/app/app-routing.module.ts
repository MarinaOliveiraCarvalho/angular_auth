import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabelaComponent } from './components/tabela/tabela.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { DefaultLayoutComponent } from './components/default/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'DefaultLayoutComponent Page'
    }
  },
  {
    path: 'tabela',
    component: TabelaComponent,
    data: {
      title: 'Tabela Page'
    }
  },
  {
    path: 'indicadores',
    component: IndicadoresComponent,
    data: {
      title: 'indicadores Page'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
