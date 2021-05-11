import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./AuthPages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./AuthPages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'forget',
    loadChildren: () => import('./AuthPages/forget/forget.module').then( m => m.ForgetPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./AuthPages/update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
  {
    path: 'alerts',
    loadChildren: () => import('./tabs/alerts/alerts.module').then(m => m.AlertsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
