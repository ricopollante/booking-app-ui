import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { FormsModule } from '@angular/forms';
import { ProfileinfoComponent } from './dashboard/profileinfo/profileinfo.component';
import { HttpClientModule } from  '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './dashboard/map/map.component';
import { LoadingscreenComponent } from './loadingscreen/loadingscreen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { BookingComponent } from './dashboard/booking/booking.component';
import { CaregivingComponent } from './dashboard/booking/caregiving/caregiving.component';
import { HousekeepingComponent } from './dashboard/booking/housekeeping/housekeeping.component';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './dashboard/footer/message/message.component';
import { UnderdevelopmentComponent } from './underdevelopment/underdevelopment.component';
import { AdminComponent } from './admin/admin.component';
import { SosComponent } from './sos/sos.component';
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    FooterComponent,
    HeaderComponent,
    ProfileinfoComponent,
    SignupComponent,
    MapComponent,
    LoadingscreenComponent,
    BookingComponent,
    CaregivingComponent,
    HousekeepingComponent,
    MessageComponent,
    UnderdevelopmentComponent,
    AdminComponent,
    SosComponent,
    WalletComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
        maxOpened: 1
      }
    ), // ToastrModule added
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
