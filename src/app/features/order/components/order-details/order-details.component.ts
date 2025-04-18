import { MenuItem } from './../../../restaurant/models/menuItem';
import { MenuItemsService } from './../../../restaurant/services/menuItems.service';
import { OrderDto } from './../../models/orderDto';
import { Waiter } from './../../../waiter/models/waiter';
import { Component, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../models/order';
import { switchMap } from 'rxjs';
import { Table } from '../../../table/models/table';
import { WaitersService } from '../../../waiter/services/waiters.service';
import { TablesService } from '../../../table/services/tables.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MenuService } from '../../../restaurant/services/menu.service';

@Component({
  selector: 'app-order-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatListModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  private orderService = inject(OrderService);
  private waiterService = inject(WaitersService);
  private tableService = inject(TablesService);
  private menuItemService = inject(MenuItemsService)
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  order?: Order;
  orderId?: number;
  restaurantId?: Number;
  menuId?: Number;
  table?: Table;
  waiter?: Waiter;
  items?: MenuItem[];

  constructor() {
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.route.paramMap.pipe(
      switchMap( params => {
        this.orderId = Number(params.get('id'));
        if (!this.orderId) {
          throw new Error('Invalid Order ID');
        }
        return this.orderService.getById(this.orderId);
      })
    ).subscribe({
      next: (data) => {
        this.order = data;
        this.restaurantId = data.restaurantId;
        if (this.order) {
          this.loadTable(Number(this.order?.tableId));
          this.loadWaiter(Number(this.order.waiterId));
          this.loadMenuItems(this.order.itemsId as number[]);
        }
      },
      error: err => console.error('Error fetching order', err)
    });
  }

  loadWaiter(waiterId: number) {
    this.waiterService.getById(waiterId).subscribe({
      next: (data) => this.waiter = data,
      error: err => console.error('Error fetching waiter', err)
    });
  }

  loadTable(tableId: number) {
    this.tableService.getById(tableId).subscribe({
      next: (data) => this.table = data ,
      error: err => console.error('Error fetching table', err)
    });
  }

  loadMenuItems(ordersId: number[]) {
    this.menuItemService.getByIds(ordersId).subscribe({
      next: (data) => {
        this.items = data
      },
      error: err => console.error('Error fetching related menu items', err)
    });
  }

  goToUpdate() {
    if (this.menuId) {
      this.router.navigate([`/order/edit/${this.orderId}/${this.restaurantId}/${this.menuId}`]);
    }
  }

  delete() {
    this.orderService._delete(Number(this.orderId)).subscribe({
      next: () => this.router.navigate([`/order/all/${this.restaurantId}`]),
      error: err => console.error('Error deleting order', err)
    });
  }

  getStatusColor(status: OrderDto.OrderStatusEnum | undefined): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case 'DELIVERED':
      case 'READY':
      case 'CONFIRMED':
        return 'primary';
      case 'PENDING':
        return 'accent';
      case 'CANCELLED':
        return 'warn';
      default:
        return 'primary';
    }
  }

}
