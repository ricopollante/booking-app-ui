import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  bookingList: any
  channels: any
  messages: any
  openMessage: boolean
  name: any
  user_id: any
  token: any
  openChannel: any
  openChannelname?: string
  constructor(private userService: UserService){
    this.token = localStorage.getItem("user_token");
    this.openMessage = false;

    this.userService.getProfile(this.token)
    .then(res => res.json())
    .then(res => {
      if (res){
        console.log(res);
        this.user_id = res.user_id



    this.userService.channels.subscribe(
      (data: any) =>{
          this.channels = data.channel
          console.log(data.channel)
      })

      this.userService.messages.subscribe(
        (data: any) =>{
          this.messages = data.data
          console.log(data.data)
        })
        this.userService.updateChannels(this.user_id)


      }
    })



  }

  ngOnInit(): void {

    this.openMessage = false;
  }

  openMessageConversation(channel: string, name:string){
    console.log("OPEN MESSAGE...")
    this.openChannel = channel;
    this.openMessage = true;
    this.userService.getMyMessages(channel)
    .then(res => res.json())
    .then(res => {
      this.messages = res.data
    })
    this.openChannelname = name;
  }

}
