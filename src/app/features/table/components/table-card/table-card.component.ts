import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Table } from '../../models/table';

@Component({
  selector: 'app-table-card',
  imports: [
    MatCardModule
  ],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.css'
})
export class TableCardComponent {
  @Input() table!: Table;

  private router = inject(Router);

  goToDetails() {
    this.router.navigate([`/table/${this.table.id}`]);
  }

}
