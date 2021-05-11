import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OddsPageRoutingModule } from './odds-routing.module';

import { OddsPage } from './odds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OddsPageRoutingModule
  ],
  declarations: [OddsPage]
})
export class OddsPageModule {}
