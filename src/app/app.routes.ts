import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "restaurant", loadChildren: () => import('./features/restaurant/restaurant.module').then(m => m.RestaurantModule) },
  { path: "waiter", loadChildren: () => import('./features/waiter/waiter.module').then(m => m.WaiterModule) },
];
