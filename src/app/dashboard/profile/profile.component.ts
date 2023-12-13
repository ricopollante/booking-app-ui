import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {io} from 'socket.io-client';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  wallet:any
  token: any;
  name: string;
  isUser: boolean;
  isCaregiver: boolean;
  isHousekeeper: boolean;
  isShowCaregiverservices: boolean;
  isShowHousekeeperservices: boolean;
  isShowBooking: boolean;
  agenda: string
  location: string
  duration: string
  notes: string
  rentals: string
  prefgender: string
  bookingListWaiting: any;
  bookingListAccepted: any;
  bookingListHistory: any;
  bookingList: any;
  showBookingList:  boolean;
  isVerified: boolean;
  isShowAcceptBookings: boolean;
  user_id: any
  pet: any
  cars_count: any
  accepter_id:any
  usertype: "USER" | "CAREGIVER" | "HOUSEKEEPER" = "USER";
  navBook: "waiting" | "accepted" | "history" = "waiting";
  isShowServices: any
  isTimerStarted: any
  sec: any
  min: any
  hr: any
  Date: Date;
  approvedBookID: any
  user_type: any
  rate: any
  overtime: any
  overtimeCharge:any
  regularCharge: any
  accepterid: any
  userid:any
  private socket = io('https://9059-66-85-26-53.ngrok-free.app',{
    extraHeaders: {
      "ngrok-skip-browser-warning" : "69420"
    }
  });

  constructor(private userService: UserService, @Inject(DOCUMENT) private document: Document) {
    this.overtime = false
    this.isTimerStarted = false
    this.Date = new Date();
    this.hr = '00'
    this.min = '00'
    this.sec = '00'
    this.isShowAcceptBookings = false;
    this.isVerified = true;
    this.showBookingList = false;
    this.pet = ''
    this.agenda = ''
    this.location = ''
    this.duration = ''
    this.notes = ''
    this.rentals = ''
    this.prefgender = ''
    this.isShowBooking = false;
    this.isUser = false;
    this.name = '';
    this.isHousekeeper = true;
    this.token = localStorage.getItem("user_token");
    this.isCaregiver = false;
    this.isShowCaregiverservices = false;
    this.isShowHousekeeperservices = false;
    console.log(this.token)
    this.userService.getProfile(this.token)
    .then(res => res.json())
    .then(res => {
      if (res){
        console.log(res);
        this.name = res.firstname;
        this.user_id = res.user_id
        this.user_type = res.user_type
        localStorage.setItem("user_type",res.user_type)

        setInterval(() => {
          this.userService.readWallet(res.user_id)
          .then(res => res.json())
          .then(res => {
            this.wallet = res;
            console.log(res)
          })
        }, 3000);


        this.userService.bookinglistWaiting.subscribe(
        (data: any) =>{
              this.bookingListWaiting = data.data
              console.log(data.data)

        })


        this.userService.bookinglistHistory.subscribe(
          (data: any) =>{
                this.bookingListHistory = data.data
                console.log(data.data)

          })

        this.userService.bookinglistAccepted.subscribe(
        (data: any) =>{
              this.bookingListAccepted = data.data

              this.rate =  data.data[0].rate
              this.duration =  data.data[0].duration
              console.log(data.data)
              this.approvedBookID = data.data[0].id
              localStorage.setItem("accepter_id",data.data[0].accepter)
              localStorage.setItem("user_id",data.data[0].user)

               this.userService.selectMapChannel(this.user_id, data.data[0].accepter)
                .then(res => res.json())
                .then(res => {
                  localStorage.setItem("channel_uuid",res.uuid)
              })

        })


        this.usertype = res.user_type.toUpperCase()
          this.userService.getBookings(this.user_id, 'user', 'false')
          .then(res => res.json())
          .then(res => {
              this.bookingList = res.data;
          })
        if(!res.verify_status){
            this.isVerified = false;
        }
        if (res.user_type == 'caregiver'){
          this.isCaregiver = true;
          this.isUser = false;
          this.isHousekeeper = false;
          this.isShowAcceptBookings = true;
        }
        else if (res.user_type == 'user'){
          this.isUser = true;
          this.isCaregiver = false;
          this.isHousekeeper = false;
        }
        else if (res.user_type == 'housekeeper'){
          this.isUser = false;
          this.isCaregiver = false;
          this.isHousekeeper = true;
          this.isShowAcceptBookings = true;
        }
      }

      if (this.isUser){

        this.userService.listBookingwaiting(this.user_id, 'user','false')
        this.userService.listBookingaccepted(this.user_id, 'user','true')
        this.userService.listBookingHistory(this.user_id, 'user','ended')
        console.log("USER.....")
      }
      else{
        this.userService.listBookingwaiting(this.user_id, 'accepter','false')
        this.userService.listBookingaccepted(this.user_id, 'accepter','true')
        this.userService.listBookingHistory(this.user_id, 'accepter','ended')
        console.log("NON-USER.....")
      }

      this.userService.getBookings(this.user_id, 'accepter', 'true')
      .then(res => res.json())
          .then(res => {
            console.log(res)
            this.userService.getBookingTimer(res.data[0].id)
            .then(res => res.json())
            .then(res => {
              if (res.start){
                this.startTimer(res.booking)
              }
            })
          })

      this.userService.getBookings(this.user_id, 'user', 'true')
          .then(res => res.json())
              .then(res => {
                console.log(res)
                this.userService.getBookingTimer(res.data[0].id)
                .then(res => res.json())
                .then(res => {
                  if (res.start){
                    this.startTimer(res.booking)
                  }
                })
              })



    })



  }

  ngOnInit(): void {
  }

  showCaregiverservices(){
    this.isShowCaregiverservices = true;
    this.isShowHousekeeperservices = false;
  }

  showHousekeeperservices(){
    this.isShowHousekeeperservices = true;
    this.isShowCaregiverservices = false;
  }


  showBooking(){
    this.isShowBooking = true;
  }

  agendaInput(event: any){
    this.agenda = event.target.value;
}
  locationInput(event: any){
    this.location = event.target.value;
  }
  durationInput(event: any){
    this.duration = event.target.value;
  }
  notesInput(event: any){
    this.notes = event.target.value;
  }
  rentalsInput(event: any){
    this.rentals = event.target.value;
  }
  prefgenderInput(event: any){
    this.prefgender = event.target.value;
  }

  // bookCompanion(){
  //   //console.log(this.agenda, this.location, this.duration, this.notes, this.rentals, this.prefgender)
  //   this.userService.bookService(this.agenda, this.location, this.location, this.notes, this.rentals, this.prefgender,'5', this.user_id, this.pet, this.cars_count, this.accepter_id)
  //   this.isShowBooking = true;
  // }
  // acceptBooking(id: string){
  //   this.userService.bookAccept(id,this.token);
  //   window.location.reload()
  // }

  showUserBookingList(){
    this.showBookingList = true;
  }

  showNavWaiting(){
    this.navBook = "waiting"
  }

  showNavAccepted(){
    this.navBook = "accepted"
  }

  showNavHistory(){
    this.navBook = "history"
  }

  showServices(){
    this.isShowServices = true;
  }

  acceptBooking(booking_id:string, receiver_id:string){
    if (this.bookingListAccepted.length > 0){
      console.log(this.bookingListAccepted)
        this.userService.toastError('Cannot accept booking','Please wait to end ongoing booking to accept new booking')
        this.userService.listBookingaccepted(this.user_id, 'accepter','true')
    }
    else{
      this.userService.bookAccept(booking_id,this.token)
      this.userService.listBookingwaiting(this.user_id, 'accepter','false')
      this.userService.listBookingaccepted(this.user_id, 'accepter','true')
      this.userService.toastSuccess("Success", "Booking accepted")
      this.userService.createChannelMessage(this.user_id,receiver_id)
      .then(res => res.json())
      .then(res => {
        console.log(res+" "+this.user_id+" "+receiver_id)
        this.socket.emit('on_message', {"uuid" : res.channel, "data" : "Hello I'm glad to accept your booking. Feel free to contact me via this chat.", "user_id" : this.user_id});
        this.userService.saveMessage(this.user_id, res.channel, "Hello I'm glad to accept your booking. Feel free to contact me via this chat.");
        this.userService.updateChannels(this.user_id)
      })
    }

  }

  startTimer(booking_id: string){
    //if (!this.isTimerStarted){
      this.userService.startBookingTimer(booking_id);
    //}

    this.isTimerStarted = true;
    this.userService.getBookingTimer(booking_id)
    .then(res => res.json())
    .then(res => {

        var log = res.start;

          var time = this.Date.getHours() + ":" + this.Date.getMinutes() + ":" + this.Date.getSeconds();
          var currentHr = time.split(":")[0]
          var currentMin = time.split(":")[1]
          var currentSec = time.split(":")[2]
          var logHr = String(log).split(" ")[1].split(":")[0]
          var logMin = String(log).split(" ")[1].split(":")[1]
          var logSec = String(log).split(" ")[1].split(":")[2]
          this.hr = Math.abs(Number(currentHr) - Number(logHr));
          this.min = Math.abs((Number(currentMin) - Number(logMin)));
          this.sec = Math.abs((Number(currentSec) - Number(logSec)));

          setInterval(() => {
            console.log(this.overtimeCharge)
            this.sec++;
            if (this.sec>59)
            {
                this.min++;
                this.sec = 0;
            }
            if (this.min>59){
              this.hr++;
              this.min = 0;
            }
              if (this.duration.includes("hr")){
                console.log('Overtime')
                  if (this.hr > Number(this.duration.replace("hr",""))){
                    this.overtime = true;
                    console.log('Overtime...')
                    this.overtimeCharge = this.overtimeCharge + (Number(this.rate.replace("php","")) * 0.016)
                  }

                  if (this.hr == Number(this.duration.replace("hr",""))){
                    if (this.min>0)
                      this.overtime = true;
                      console.log('Overtime...........')
                      this.overtimeCharge = this.overtimeCharge + (Number(this.rate.replace("php","")) * 0.016)
                  }

              }
              if (this.duration.includes("m")){
                (this.min > Number(this.duration.replace("m","")))
                this.overtime = true;
                console.log('Overtime')
                this.overtimeCharge = this.overtimeCharge + (Number(this.rate.replace("php","")) * 0.016)
              }
          }, 1000)
          if (this.isUser){
            this.userService.listBookingwaiting(this.user_id, 'user','false')
            this.userService.listBookingaccepted(this.user_id, 'user','true')
            console.log("USER.....")
          }
          else{
            this.userService.listBookingwaiting(this.user_id, 'accepter','false')
            this.userService.listBookingaccepted(this.user_id, 'accepter','true')
            console.log("NON-USER.....")
          }

    })



  }


  gotoMap(){
    this.document.location.href = "/map"
  }

  endBooking(booking_id:string){
    this.accepterid = localStorage.getItem("accepter_id")
    this.userid = localStorage.getItem("user_id")
    this.userService.endBooking(booking_id, this.overtimeCharge, '0')
    this.userService.bookingCharge(booking_id)
    .then(res => res.json())
    .then(res => {

      this.userService.chargeWallet(this.accepterid, this.userid, res.amount )
      this.userService.chargeWallet(this.accepterid, this.userid, res.amount )
      this.userService.chargeWallet(this.accepterid, this.userid, res.overtime )
      this.userService.chargeWallet(this.accepterid, this.userid, res.rental_charge )
      this.userService.listBookingwaiting(this.user_id, 'accepter','false')
      this.userService.listBookingaccepted(this.user_id, 'accepter','true')
      this.userService.listBookingHistory(this.user_id, 'accepter','ended')
      window.location.reload();

   })


    ///150 per hr regular
    ///80 per hr OT
    ///300 general cleaning
  }
cancel(id:string){
    this.userService.cancelBook(id)
    this.userService.listBookingwaiting(this.user_id, 'user','false')
    this.userService.listBookingaccepted(this.user_id, 'user','true')
    this.userService.listBookingHistory(this.user_id, 'user','ended')
  }

  decline(id:string){
    this.userService.declineBook(id)
    this.userService.listBookingwaiting(this.user_id, 'accepter','false')
    this.userService.listBookingaccepted(this.user_id, 'accepter','true')
    this.userService.listBookingHistory(this.user_id, 'accepter','ended')

  }
}

