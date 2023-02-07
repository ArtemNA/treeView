import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';

import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AccountsComponent } from './accounts.component';

@NgModule({
  declarations: [AccountsComponent],
  imports: [
    SharedModule,
    AccountsRoutingModule,
    MatTreeModule,
  ]
})
export class AccountsModule {
}
