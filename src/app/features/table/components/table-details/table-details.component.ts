import { Component, inject } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../models/table';
import { of, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Waiter } from '../../../waiter/models/waiter';
import { WaitersService } from '../../../waiter/services/waiters.service';

@Component({
  selector: 'app-table-details',
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './table-details.component.html',
  styleUrl: './table-details.component.css'
})
export class TableDetailsComponent {
  private tableService = inject(TablesService);
  private waiterService = inject(WaitersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  table?: Table;
  tableId?: number;
  waiters?: Waiter[];

  constructor() {
    this.getTableDetails();
  }

  getTableDetails() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id || isNaN(+id)) {
          return of(null);
        }
        this.tableId = +id;
        return this.tableService.getById(this.tableId);
      })
    ).subscribe({
      next: (data) => {
        this.table = data,
        this.getWaiters();
      },
      error: err => console.error('Error fetching table details', err)
    });
  }

  getWaiters() {
    if(this.table?.waitersId?.length){
       this.waiterService.getWaitersByIds(this.table?.waitersId as number[]).subscribe({
        next: (data) => this.waiters = data,
        error: err => console.error('Error fetching asigned waiters', err)
      })
    }
  }

  goToUpdate() {
    this.router.navigate([`/table/edit/${this.tableId}`]);
  }

  delete() {
    this.tableService._delete(Number(this.tableId)).subscribe({
      next: () => this.router.navigate([`/table`]),
      error: err => console.error('Error deleting table', err)
    });
  }

}
