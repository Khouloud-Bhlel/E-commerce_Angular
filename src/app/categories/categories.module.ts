  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { EditCatComponent } from './edit/edit.component';
import { CreateCatComponent } from './create/create.component';
import { ViewCatComponent } from './view/view.component';
import { CategoriesComponent } from './index/index.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { FilePondModule } from 'ngx-filepond';

@NgModule({
  declarations: [
    CategoriesComponent,
    CreateCatComponent,
    EditCatComponent,
   
    ViewCatComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    CloudinaryModule,
    FilePondModule

  ]
})
export class CategoriesModule { }
