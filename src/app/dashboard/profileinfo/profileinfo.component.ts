import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profileinfo',
  templateUrl: './profileinfo.component.html',
  styleUrls: ['./profileinfo.component.css']
})
export class ProfileinfoComponent {
  token: any;
  profileInfo: any;
  user: any
constructor(private userService: UserService){
  this.token = localStorage.getItem("user_token");
  this.userService.getProfile(this.token)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.profileInfo = res
      this.user = res.user_type.toUpperCase()
    })
  }

}
