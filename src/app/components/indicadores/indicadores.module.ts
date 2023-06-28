import { NgModule } from '@angular/core';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { IndicadoresComponent } from './indicadores.component';
import { IndicadoresRoutingModule } from './indicadores-routing.module';

@NgModule({
  imports: [
    IndicadoresRoutingModule,
    //BsDropdownModule
  ],
  declarations: [ IndicadoresComponent ]
})
export class IndicadoresModule { }