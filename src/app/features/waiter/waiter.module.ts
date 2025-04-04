import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterRoutingModule } from './waiter-routing.module';
import { WaitersService } from './services/waiters.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WaiterRoutingModule,
  ],
  providers: [
    WaitersService
  ]
})
export class WaiterModule { }
