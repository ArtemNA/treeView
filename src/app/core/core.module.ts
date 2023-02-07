import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { appReducer } from './state/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AccountEffects } from './state/effects/account.effects';

const ngRxModules = [
  StoreModule.forRoot(appReducer),
  EffectsModule.forRoot([AccountEffects]),
  StoreDevtoolsModule.instrument({ maxAge: 100 }),
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...ngRxModules
  ],
  providers: [ApiService]
})
export class CoreModule { }
