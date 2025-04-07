import { WaiterListComponent } from './components/waiter-list/waiter-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaiterDetailsComponent } from './components/waiter-details/waiter-details.component';
import { WaiterCreateComponent } from './components/waiter-create/waiter-create.component';

const routes: Routes = [
  { path: 'create', component: WaiterCreateComponent },
  { path: 'all/:id', component: WaiterListComponent },
  { path: 'edit/:id', component: WaiterCreateComponent },
  { path: ':id', component: WaiterDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaiterRoutingModule { }
