import { Waiter } from './../../models/waiter';
import { Component, inject } from '@angular/core';
import { WaitersService } from '../../services/waiters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { min, of, switchMap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';


@Component({
  selector: 'app-waiter-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './waiter-create.component.html',
  styleUrl: './waiter-create.component.css'
})
export class WaiterCreateComponent {
  private formBuilder = inject(FormBuilder);
  private waiterService = inject(WaitersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  tables: any;
  waiterForm: FormGroup;
  isEditMode = false;
  waiterId?: number;

  constructor() {
    this.waiterForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(1)]],
      lastname: ['', [Validators.required, Validators.minLength(1)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      tablesId: [[]],
      restaurantId: [1]
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id && !isNaN(+id)) {
          this.isEditMode = true;
          this.waiterId = +id
          return this.waiterService.getById(this.waiterId);
        }
        return of(null);
      })
    ).subscribe({
      next: waiter => {this.waiterForm.patchValue(waiter) },
      error: err => {
        console.error("Error loading waiter", err)
      }
    });
  }

  submitForm() {
    if (this.waiterForm?.valid) {
      if (this.isEditMode && this.waiterId) {
        this.waiterService.update(this.waiterForm.value, this.waiterId).subscribe({
          next: () => this.router.navigate([`/waiter/${this.waiterId}`]),
          error: err => console.error("Error updating waiter", err)
        });
      } else {
        console.log(this.waiterForm.value)
        this.waiterService.save(this.waiterForm.value).subscribe({
          next: () => this.router.navigate([`/waiter`]),
          error: err => console.error('Error saving waiter', err)
        });
      }
    }
  }
}
