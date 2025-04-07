import { ActivatedRoute, Router } from '@angular/router';
import { TablesService } from './../../services/tables.service';
import { Component, inject } from '@angular/core';
import { Table } from '../../models/table';
import { switchMap } from 'rxjs';
import { TableCardComponent } from '../table-card/table-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-list',
  imports: [
    CommonModule,
    TableCardComponent
  ],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent {
  private tableService = inject(TablesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  tables?: Table[];
  page = 0;
  size = 10;
  totalPages = 1;

  constructor() {
    this.loadTables();
  }

  loadTables() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          throw new Error('Invalid restaurant id');
        }
        return this.route.queryParamMap.pipe(
          switchMap( queryParams => {
            this.page = Number(queryParams.get('page')) || 0;
            this.size = Number(queryParams.get('size')) || 10;
            return this.tableService.getAllByRestaurant(+id, this.page, this.size);
          })
        );
      })
    ).subscribe({
      next: (data) => this.tables = data._embedded?.tableList || [],
      error: err => console.error('Error fetching tables', err)
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
