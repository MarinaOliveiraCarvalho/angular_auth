import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicadoresComponent } from './indicadores.component';

const routes: Routes = [
  {
    path: '',
    component: IndicadoresComponent,
    data: {
      title: 'Clientes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicadoresRoutingModule {}