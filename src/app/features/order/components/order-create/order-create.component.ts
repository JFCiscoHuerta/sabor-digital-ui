import { MenuItemsService } from './../../../restaurant/services/menuItems.service';
import { TablesService } from './../../../table/services/tables.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { WaitersService } from '../../../waiter/services/waiters.service';
import { Order } from '../../models/order';
import { Table } from '../../../table/models/table';
import { Waiter } from '../../../waiter/models/waiter';
import { MenuItem } from '../../../restaurant/models/menuItem';
import { of, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-create',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule

  ],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private waiterService = inject(WaitersService);
  private tablesService = inject(TablesService);
  private menuItemService = inject(MenuItemsService);

  orderForm: FormGroup;
  tables?: Table[];
  waiters?: Waiter[];
  menuItems?: MenuItem[];
  isEditMode = false;

  orderId?: number;
  menuId?: number;
  restaurantId?: number;

  constructor() {
    this.orderForm = this.formBuilder.group({
      itemsId: [[], Validators.required],
      restaurantId: [0, Validators.required],
      waiterId: [],
      price: [],
      tableId: [],
      orderType: ['', Validators.required],
      paymentType: ['', Validators.required],
      orderStatus: ['', Validators.required]
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        this.orderId = Number(params.get('orderId')) || NaN;
        this.menuId = Number(params.get('menuId'));
        this.restaurantId = Number(params.get('restaurantId'));
        if (this.orderId) {
          this.isEditMode = true;
          return this.orderService.getById(this.orderId);
        }
        return of(null);
      })
    ).subscribe({
      next: order => {
        this.loadMenuItems(this.menuId!),
        this.loadTables(this.restaurantId!),
        this.loadWaiters(this.restaurantId!),
        this.orderForm.patchValue(order)
      },
      error: err => console.error('Error loading data', err)
    });
  }

  loadWaiters(restaurantId: number) {
    this.waiterService.getAllByRestaurantId(restaurantId).subscribe({
      next: (data) => this.waiters = data._embedded?.waiterList || [],
      error: err => console.error('Error fetching waiters', err)
    });
  }

  loadTables(restaurantId: number) {
    this.tablesService.getAllByRestaurant(restaurantId).subscribe({
      next: (data) => this.tables = data._embedded?.tableList || [],
      error: err => console.error('Error fetching tables', err)
    });
  }

  loadMenuItems(menuId: number) {
    this.menuItemService.getByMenu(menuId).subscribe({
      next: (data) => this.menuItems = data._embedded?.menuItemList || [],
      error: err => console.error('Error fetching menu items', err)
    });
  }

  submitForm() {
    if (this.orderForm?.valid) {
      if (this.isEditMode && this.orderId) {
        this.orderService.update(this.orderForm.value, this.orderId).subscribe({
          next: () => this.router.navigate([`/order/all/${this.menuId}`]),
          error: err => console.log('Error updating waiter', err)
        });
      } else {
        this.orderForm.value.price = this.calculatePrice(this.menuItems!);
        this.orderForm.value.restaurantId = this.restaurantId;
        this.orderService.create(this.orderForm.value).subscribe({
          next: (order) => this.router.navigate([`/order/${order.id}`]),
          error: err => console.error('Error saving order', err)
        });
      }
    }
  }

  calculatePrice(items: MenuItem[]) {
    return items.reduce((total, item) => total + item.price!, 0);
  }

  cancel() {
    this.router.navigate(['/orders']);
  }

}
