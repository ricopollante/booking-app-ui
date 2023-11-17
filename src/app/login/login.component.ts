import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {GoogleAuth, User} from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';
import {
  FacebookLogin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login';
import { DOCUMENT } from '@angular/common';

// import { CapacitorHttp, HttpResponse } from '@capacitor/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
isNewUser: boolean;
username: string;
password: string;
userInfo: string;
  constructor(private userService: UserService, private router: Router, @Inject(DOCUMENT) private document: Document,) {
    this.userInfo = '';
    this.isNewUser = false;
    this.password = '';
    this.username = '';

   }

   async ngOnInit() {
    console.log("LOGIN PAGE....")
    if (Capacitor.getPlatform() === 'ios') {
      // do something
    }
    if (Capacitor.getPlatform() === 'android') {
      // do something
    }
    else{
      GoogleAuth.initialize();
      // use hook after platform dom ready
      await FacebookLogin.initialize({ appId: '1073203297189449' });
    }
}

  async signIn() {
    //User Authentication
    try {
      const user: User = await GoogleAuth.signIn();
      console.log(user)
      this.userService.debugger(JSON.stringify(user));
      this.userService.login(user.email, user.email)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("user_token", res.token)
        this.userService.hideLoginPage()
         if(this.username =='superadmin' && this.password=='superadmin'){
            this.document.location.href = "/admin"
            localStorage.setItem("is_admin", "true")
         }
    })

    }
    catch (error) {
      this.userService.debugger(String(error));
    }
  }

  async facebookLogin(){
    const FACEBOOK_PERMISSIONS = [
      'email',
      // 'user_birthday',
      // 'user_photos',
      // 'user_gender',
    ];
    const result = await (<FacebookLoginResponse><unknown>(
        FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
      ));

    if (result.accessToken) {
      // Login successful.
      console.log(`Facebook access token is ${result.accessToken.token}`);
      console.log(`Facebook: ${JSON.stringify(result)}`);
      this.userService.debugger(String(result));
    }
    const getProfile = await FacebookLogin.getProfile<{
      email: string;
    }>({ fields: ['email'] });

    console.log(`Facebook user's email is ${getProfile.email}`);
    this.userService.debugger(String(getProfile.email));
  }

  showSignUpPage(){
    this.isNewUser = true;
  }

  usernameInput(event: any){
      this.username = event.target.value;
  }
  passwordInput(event: any){
    this.password = event.target.value;
}

  loginUser(){

    this.userService.login(this.username, this.password)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("user_token", res.token)
        this.userService.hideLoginPage()
         if(this.username =='superadmin' && this.password=='superadmin'){
            this.document.location.href = "/admin"
            localStorage.setItem("is_admin", "true")
         }
    })
  }

}
