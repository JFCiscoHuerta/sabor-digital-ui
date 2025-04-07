import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterRoutingModule } from './waiter-routing.module';
import { WaitersService } from './services/waiters.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { TablesService } from '../table/services/tables.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WaiterRoutingModule,
  ],
  providers: [
    WaitersService,
    TablesService
  ]
})
export class WaiterModule { }
