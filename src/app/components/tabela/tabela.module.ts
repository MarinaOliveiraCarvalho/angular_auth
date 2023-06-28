import { NgModule } from '@angular/core';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { TabelaComponent } from './tabela.component';
import { TabelaRoutingModule } from './tabela-routing.module';

@NgModule({
  imports: [
    TabelaRoutingModule,
    //BsDropdownModule
  ],
  declarations: [ TabelaComponent ]
})
export class TabelaModule { }