import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token: any;
  name: string;
  isUser: boolean;
  isCaregiver: boolean;
  isHousekeeper: boolean;
  isShowCaregiverBookForm: boolean;
  isShowBooking: boolean;
  agenda: string
  location: string
  duration: string
  notes: string
  rentals: string
  prefgender: string
  bookingList: any;
  showBookingList:  boolean;
  isVerified: boolean;
  isShowAcceptBookings: boolean;
  constructor(private userService: UserService) {
    this.isShowAcceptBookings = false;
    this.isVerified = false;
    this.showBookingList = false;
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
    this.isShowCaregiverBookForm = false;
    console.log(this.token)
    this.userService.getProfile(this.token)
    .then(res => res.json())
    .then(res => {
      if (res){
        console.log(res);
        this.name = res.firstname;
        if(res.verify_status){
            this.isVerified = true;
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
    })

    this.userService.getBookings()
    .then(res => res.json())
    .then(res => {
        this.bookingList = res.data;
    })

  }

  ngOnInit(): void {
  }

  showCaregiverBookingForm(){
    this.isShowCaregiverBookForm = true;
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

  submitBook(){
    //console.log(this.agenda, this.location, this.duration, this.notes, this.rentals, this.prefgender)
    this.userService.bookService(this.agenda, this.location, this.location, this.notes, this.rentals, this.prefgender)
    this.isShowBooking = true;
  }
  acceptBooking(id: string){
    this.userService.bookAccept(id,this.token);
    window.location.reload()
  }

  showUserBookingList(){
    this.showBookingList = true;
  }
}
