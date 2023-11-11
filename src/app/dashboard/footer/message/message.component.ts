import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  bookingList: any
  constructor(private userService: UserService){
    // this.userService.getBookings()
    // .then(res => res.json())
    // .then(res => {
    //     this.bookingList = res.data;
    // })

  }
}
