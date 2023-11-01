import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {GoogleAuth, User} from '@codetrix-studio/capacitor-google-auth';
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
  constructor(private userService: UserService, private router: Router) {
    this.isNewUser = false;
    this.password = '';
    this.username = '';
    // // can be passed as a raw JS Object (must be JSON serializable)
    // const doPost = async () => {
    //   const options = {
    //     url: 'http://10.42.0.67:8080/user/login',
    //     headers: {},
    //     data: {username : "caregiver", password : "caregiver"},
    //   };

    //   const response: HttpResponse = await CapacitorHttp.post(options);

    //   console.log(response);

    //   // or...
    //   // const response = await CapacitorHttp.request({ ...options, method: 'POST' })

    // };

    // doPost()

   }

   async ngOnInit() {
    GoogleAuth.initialize();
}

  async signIn() {
    //User Authentication
    const user: User = await GoogleAuth.signIn();
    console.log(user)
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
