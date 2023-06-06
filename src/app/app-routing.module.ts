import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'; 

import { PagesComponent } from './pages/pages.component';
import { LockScreenComponent } from './pages/lock-screen/lock-screen.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { 
    path: '', 
    
    component: PagesComponent, children: [
        //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
        { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
        { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
        { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
        { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) },
        { path: 'chefs', loadChildren: () => import('./pages/chefs/chefs.module').then(m => m.ChefsModule) },
        { path: 'reservation', loadChildren: () => import('./pages/reservation/reservation.module').then(m => m.ReservationModule) },
        { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
        { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule) },
        { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
        { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
        { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
        { path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule) },
        { path: 'terms-conditions', loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) },
    ]
  },
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'lock-screen', component: LockScreenComponent },
  {path:'upload', component:UploadComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabledBlocking'
})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }