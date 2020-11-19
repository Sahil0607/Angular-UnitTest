import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstStrArrayComponent } from './first-str-array/first-str-array.component';
import { TenthFakeAsyncTickComponent } from './tenth-fake-async-tick/tenth-fake-async-tick.component';

const routes: Routes = [
  { path: 'first-component', component: FirstStrArrayComponent },
  { path: 'tenth-component', component: TenthFakeAsyncTickComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
