import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';

const modules = [
MatCardModule,
MatButtonModule,
MatSelectModule,
MatFormFieldModule,
FormsModule,
ReactiveFormsModule,
MatInputModule,
MatIconModule,
MatExpansionModule,
MatProgressSpinnerModule,
MatToolbarModule,
MatTableModule,
MatBadgeModule,

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports: modules
})
export class MaterialModule { }
