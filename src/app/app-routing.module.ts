import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstStrArrayComponent } from './first-str-array/first-str-array.component';

const routes: Routes = [
  { path: 'first-component', component: FirstStrArrayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
