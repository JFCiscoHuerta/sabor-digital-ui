import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderService } from './services/order.service';
import { WaitersService } from '../waiter/services/waiters.service';
import { TablesService } from '../table/services/tables.service';
import { MenuItemsService } from '../restaurant/services/menuItems.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrderRoutingModule
  ],
  providers: [
    OrderService,
    WaitersService,
    TablesService,
    MenuItemsService
  ]
})
export class OrderModule { }
