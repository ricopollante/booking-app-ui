import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {GoogleAuth, User} from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';
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
  constructor(private userService: UserService, private router: Router) {
    this.userInfo = '';
    this.isNewUser = false;
    this.password = '';
    this.username = '';

   }

   async ngOnInit() {
    if (Capacitor.getPlatform() === 'ios') {
      // do something
    }
    if (Capacitor.getPlatform() === 'android') {
      // do something
    }
    else{
      GoogleAuth.initialize();
    }
}

  async signIn() {
    //User Authentication
    try {
      const user: User = await GoogleAuth.signIn();
      console.log(user)
      this.userService.debugger(JSON.stringify(user));
    }
    catch (error) {
      this.userService.debugger(String(error));
    }
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
    })
  }

}
