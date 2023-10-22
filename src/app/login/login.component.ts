import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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
   }

  ngOnInit(): void {
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
