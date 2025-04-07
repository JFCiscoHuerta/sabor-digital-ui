import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TablesService } from './services/tables.service';
import { WaitersService } from '../waiter/services/waiters.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableRoutingModule
  ],
  providers: [
    TablesService,
    WaitersService
  ]
})
export class TableModule { }
