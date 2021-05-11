import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'form',
        loadChildren: () => import('./forum/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule)
      },
      {
        path: 'Injury',
        loadChildren: () => import('./injury-report/injury-report.module').then(m => m.InjuryReportPageModule)
      },
      {
        path: 'team',
        loadChildren: () => import('./team/team.module').then(m => m.TeamPageModule)
      },
      {
        path: 'odds',
        loadChildren: () => import('./odds/odds.module').then( m => m.OddsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
