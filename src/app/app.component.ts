import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantModule } from './features/restaurant/restaurant.module';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sabor-digital-ui';
}
