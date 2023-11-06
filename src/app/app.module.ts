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
  ],
  imports: [
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
