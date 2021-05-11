import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OddsPage } from './odds.page';

const routes: Routes = [
  {
    path: '',
    component: OddsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OddsPageRoutingModule {}
