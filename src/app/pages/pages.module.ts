import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    SharedModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
