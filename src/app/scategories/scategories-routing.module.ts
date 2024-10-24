import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScategoriesComponent } from './index/index.component';


const routes: Routes = [
  { path: 'scategories', component: ScategoriesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScategoriesRoutingModule { }
