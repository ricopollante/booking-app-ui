import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileinfoComponent } from './dashboard/profileinfo/profileinfo.component';
import { ProfileComponent } from './dashboard/profile/profile.component';

const routes: Routes = [
  {
    path: "profile" , component: ProfileinfoComponent,
  },
  {
    path: "dashboard" , component: ProfileComponent,
  },
  {
    path: '',   redirectTo: 'dashboard', pathMatch: 'full' ,
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
