import { Waiter } from './../../models/waiter';
import { ActivatedRoute, Router } from '@angular/router';
import { WaitersService } from './../../services/waiters.service';
import { Component, inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { WaiterCardComponent } from '../waiter-card/waiter-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waiter-list',
  imports: [
    CommonModule,
    WaiterCardComponent
  ],
  templateUrl: './waiter-list.component.html',
  styleUrl: './waiter-list.component.css'
})
export class WaiterListComponent {
  private waitersService = inject(WaitersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  waiters?: Waiter[];
  page = 0;
  size = 10;
  totalPages = 1;

  constructor() {
    this.loadWaiters();
  }

  loadWaiters() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) { throw new Error('Invalid restaurant id'); }
        return this.route.queryParamMap.pipe(
          switchMap( queryParams => {
            this.page = Number(queryParams.get('page')) || 0;
            this.size = Number(queryParams.get('size')) || 10;
            return this.waitersService.getAllByRestaurantId(+id, this.page, this.size);
          })
        )
      })
    ).subscribe({
      next: (data) => {
        this.waiters = data._embedded?.waiterList || [];
        this.totalPages = data.page?.totalPages;
      },
      error: err => console.error('Error fetching waiters', err)
    });
  }

  changePages(newPage: number) {
    if (newPage < 0 || newPage >= this.totalPages) return;
    this.router.navigate([], {
      queryParams: { page: newPage, size: this.size },
      queryParamsHandling: 'merge'
    });
  }
}
