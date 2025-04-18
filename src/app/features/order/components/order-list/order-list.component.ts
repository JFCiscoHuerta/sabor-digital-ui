import { Component, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../models/order';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-order-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  displayedColumns: string[] = ['createdAt', 'price', 'details'];

  orders?: Order[];
  orderId?: number;
  page = 0;
  size = 10;
  totalPages = 1;


  //Temporal
  restaurantId = 1;

  constructor() {
    this.loadOrders();
  }

  loadOrders() {
    this.route.paramMap.pipe(
      switchMap( params => {
        this.orderId = Number(params.get('id'));
        if (!this.orderId) { throw new Error('Invalid order id'); }
        return this.route.queryParamMap.pipe(
          switchMap( queryParams => {
            this.page = Number(queryParams.get('page')) || 0;
            this.size = Number(queryParams.get('size')) || 10;
            return this.orderService.getAllByRestaurant(this.restaurantId, this.page, this.size);
          })
        );
      })
    ).subscribe({
      next: (data) => {
        this.orders = data._embedded?.orderList || [],
        this.totalPages = data.page?.totalPages
      },
      error: err => console.error('Error fetching orders', err)
    });
  }

  changePages(newPage: number) {
    if (newPage < 0 || newPage >= this.totalPages ) return;
    this.router.navigate([], {
      queryParams: { page: newPage, size: this.size },
      queryParamsHandling: 'merge'
    });
  }

  goToDetails(id: number) {
    this.router.navigate([`/order/${id}`]);
  }

}
