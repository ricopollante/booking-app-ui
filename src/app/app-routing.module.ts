import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileinfoComponent } from './dashboard/profileinfo/profileinfo.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { MessageComponent } from './dashboard/footer/message/message.component';
import { MapComponent } from './dashboard/map/map.component';
import { LoginComponent } from './login/login.component';
import { UnderdevelopmentComponent } from './underdevelopment/underdevelopment.component';
import { AdminComponent } from './admin/admin.component';
import { WalletComponent } from './wallet/wallet.component';
import { ShoppingComponent } from './dashboard/footer/shopping/shopping.component';

const routes: Routes = [
  {
    path: "profile" , component: ProfileinfoComponent,
  },
  {
    path: "dashboard" , component: ProfileComponent,
  },
  {
    path: "message" , component: MessageComponent,
  },
  {
    path: "map" , component: MapComponent,
  },
  {
    path: "login" , component: LoginComponent,
  },
  {
    path: "underdev" , component: UnderdevelopmentComponent,
  },
  {
    path: "admin" , component: AdminComponent,
  },
  {
    path: "wallet" , component: WalletComponent,
  },
  {
    path: "shopping" , component: ShoppingComponent,
  },
  {
    path: '',   redirectTo: 'dashboard', pathMatch: 'full' ,
 },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
