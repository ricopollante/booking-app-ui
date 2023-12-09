import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import {io} from 'socket.io-client';
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
  user_id:any
  _accepterid:any
  private socket = io('https://f0c6-66-85-26-53.ngrok-free.app',{
    extraHeaders: {
      "ngrok-skip-browser-warning" : "69420"
    }
  });
  constructor(private userService: UserService){
    this._accepterid =    localStorage.getItem("_accepterid");
    this.token = ''
    this.isLoggedIn = false;
    this.showLogin = true;
    this.token = localStorage.getItem("user_token");

    this.userService.showLogin.subscribe(
      (data: any) =>{
        this.showLogin = data;
      }
    );

    if (this.token == null || this.token == '' || this.token.length == 0){
      this.showLogin = true;
    }
    else if(this.token.length>0){
      this.userService.getProfile(this.token)
      .then(res => res.json())
      .then(res => {
        if (res){
          this.isLoggedIn = true;
          this.showLogin = false;
          localStorage.setItem("_accepterid", res.user_id);

        }
      })


    }

    this.socket.on('on_booking_update', (data: any) => {
      var id = data.data.id
      console.log(data.data.id)
      this.userService.listBookingwaiting(id, 'accepter','false')
    });


}
}
