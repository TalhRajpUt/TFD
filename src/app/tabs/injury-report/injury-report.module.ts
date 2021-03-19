import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InjuryReportPageRoutingModule } from './injury-report-routing.module';

import { InjuryReportPage } from './injury-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InjuryReportPageRoutingModule
  ],
  declarations: [InjuryReportPage]
})
export class InjuryReportPageModule {}
