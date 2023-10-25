import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLogin: boolean;
  isLoggedIn: boolean;
  token: any;
  title = 'bookingapp';
  constructor(private userService: UserService){
    this.isLoggedIn = false;
    this.showLogin = true;
    this.token = localStorage.getItem("user_token");
    if (this.token.length > 0){
      this.showLogin = false;
    }
    this.userService.getProfile(this.token)
    .then(res => res.json())
    .then(res => {
      if (res){
        this.isLoggedIn = true;
      }
    })
    this.userService.showLogin.subscribe(
      (data: any) =>{
        this.showLogin = data;
      }
    );
}
}
