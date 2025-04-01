import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RestaurantService } from '../../services/restaurant.service';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-restaurant-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './restaurant-create.component.html',
  styleUrl: './restaurant-create.component.css'
})
export class RestaurantCreateComponent {
  private formBuilder = inject(FormBuilder);
  private restaurantService = inject(RestaurantService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  restaurantForm: FormGroup;
  isEditMode = false;
  restaurantId?: number;

  constructor() {
    this.restaurantForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      website: [''],
      logo: ['']
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.restaurantId = +id;
          return this.restaurantService.getById(this.restaurantId);
        }
        return [];
      })
    ).subscribe({
      next: restaurant => this.restaurantForm.patchValue(restaurant),
      error: err => console.error("Error loading restaurant", err)
    });
  }

  submitForm() {
    if (this.restaurantForm.valid) {
      if (this.isEditMode && this.restaurantId) {
        this.restaurantService.update(this.restaurantForm.value, this.restaurantId).subscribe({
          next: () => this.router.navigate([`/restaurant/${this.restaurantId}`]),
          error: err => console.error('Error updating restaurant', err)
        });
      } else {
        this.restaurantService.create(this.restaurantForm.value).subscribe({
          next: () => this.router.navigate(['/restaurant']),
          error: err => console.error('Error creating restaurant', err)
        })
      }
    }
  }

}
