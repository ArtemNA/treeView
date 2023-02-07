import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InputWithSelectComponent } from './components/input-with-select/input-with-select.component';
import { HeaderComponent } from './components/header/header.component';

const sharedModules = [
  ReactiveFormsModule,
  CommonModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    InputWithSelectComponent,
    HeaderComponent
  ],
  imports: [
    ...sharedModules,
    RouterLink,
  ],
  exports: [
    ...sharedModules,
    InputWithSelectComponent,
    HeaderComponent
  ]
})
export class SharedModule {
}
