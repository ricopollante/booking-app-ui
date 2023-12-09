import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {io} from 'socket.io-client';
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
  messagesWS: any
  messageToSend: any
  private socket = io('https://cc2b-58-69-61-224.ngrok-free.app',{
    extraHeaders: {
      "ngrok-skip-browser-warning" : "69420"
    }
  });
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
          data.channel.forEach( (value: any) => {
            this.socket.emit('on_message', {"uuid" : String(value.uuid), "data" : ""}); // listen and save src coordinates
          });
      })

      this.userService.messages.subscribe(
        (data: any) =>{
          this.messages = data.data
          console.log(data.data)
        })
        this.userService.updateChannels(res.user_id)

        this.socket.on('on_message_rcv', (data: any) => {
          console.log(data)
          if (this.user_id != data.user_id){
            //this.userService.saveMessage(this.user_id, data.uuid, data.data);

          }
          setTimeout(() => {
            this.userService.updateMessages(data.uuid)
            this.userService.updateChannels(this.user_id)
          }, 1000);



      });

      }
    })


  }

  ngOnInit(): void {
    setInterval(() => {
      this.userService.updateChannels(this.user_id)
      console.log("updating channels...")
    }, 5000);
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

  sendMessage(){
    //this.socket.emit('on_message', {"uuid" : this.openChannel, "data" : this.messageToSend, "user_id" : this.user_id}); //
    this.userService.saveMessage(this.user_id,this.openChannel, this.messageToSend);

    setTimeout(() => {
      this.userService.updateMessages(this.openChannel)
    }, 1000);



  }

}
