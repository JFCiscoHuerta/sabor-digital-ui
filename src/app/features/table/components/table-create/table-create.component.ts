import { WaitersService } from './../../../waiter/services/waiters.service';
import { switchMap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablesService } from '../../services/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Waiter } from '../../../waiter/models/waiter';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-create',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './table-create.component.html',
  styleUrl: './table-create.component.css'
})
export class TableCreateComponent {
  private formBuilder = inject(FormBuilder);
  private tablesService = inject(TablesService);
  private waitersService = inject(WaitersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  tableForm: FormGroup;
  isEditMode = false;
  tableId?: number;
  restaurantId?: number;
  waiters?: Waiter[];

  constructor() {
    this.tableForm = this.formBuilder.group({
      restaurantId: [],
      tableIdentifier: ['', [Validators.required]],
      waitersId: []
    });
    //Temporal
    this.restaurantId = 1;
    this.loadWaiters();

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.tableId = +id;
          return this.tablesService.getById(this.tableId);
        }
        return [];
      })
    ).subscribe({
      next: (data) => this.tableForm.patchValue(data),
      error: err => console.error('Error fetching table', err)
    });
  }

  loadWaiters() {
    this.waitersService.getAllByRestaurantId(Number(this.restaurantId)).subscribe({
      next: (data) => this.waiters = data._embedded?.waiterList || [],
      error: err => console.error('Error fetching waiters', err)
    })
  }

  removeWaiter(waiterId: number) {
    const current = this.tableForm.value.waitersId as number [];
    this.tableForm.patchValue({
      waitersId: current.filter(id => id !== waiterId)
    })
  };

  getWaiterName(id: number) {
    const waiter = this.waiters?.find(w => w.id === id);
    return waiter ? `${waiter.firstname} ${waiter.lastname}`  : 'Unknown';
  }

  submitForm() {
    if (this.tableForm.valid) {
      if (this.isEditMode && this.tableId) {
        this.tablesService.update(this.tableForm.value, this.tableId).subscribe({
          next: () => this.router.navigate([`/table/${this.tableId}`]),
          error: err => console.error('Error updating table', err)
        })
      } else {
        this.tableForm.value.restaurantId = this.restaurantId;
        this.tablesService.create(this.tableForm.value).subscribe({
          next: (param) => this.router.navigate([`/table/${param.id}`]),
          error: err => console.error('Error creating table', err)
        })
      }
    }
  }

}
