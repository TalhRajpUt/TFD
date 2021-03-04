import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InjuryReportPage } from './injury-report.page';

const routes: Routes = [
  {
    path: '',
    component: InjuryReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InjuryReportPageRoutingModule {}
