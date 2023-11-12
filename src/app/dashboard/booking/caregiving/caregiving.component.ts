import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-caregiving',
  templateUrl: './caregiving.component.html',
  styleUrls: ['./caregiving.component.css']
})
export class CaregivingComponent implements OnInit{
  isShowServiceForm: any | "companion" | "personal_care" | "babysitting" | "errands" = "list";
  agendas: any
  service_types: any
  rentals: any
  genders: any
  rates: any
  duration: any
  notes: any
  isServerStaffList: any
  caregivers: any
  selectedServiceType: any
  selectedAgenda: any
  selectedRental: any
  selectedGender: any
  selectedRate: any;
  selectedDuration: any;
  selectedAccepterID: any
  location: any
  serviceType: "" |"companion" | "personal_care" | "babysitting" | "errands" = "";
  token: any;
  user_id: any
  constructor(@Inject(DOCUMENT) private document: Document, private userService: UserService){
      this.selectedRate = '300'
      this.token = localStorage.getItem("user_token");
  }

  ngOnInit(): void {


    this.userService.availableStaff.subscribe(
      (data: any) =>{
        this.caregivers = data.data;
    })
    this.userService.getProfile(this.token)
    .then(res => res.json())
    .then(res => {
      this.user_id = res.user_id
    })

    this.userService.getAgenda()
    .then(res => res.json())
    .then(res => {
      this.agendas = res.data;
    })

    this.userService.getServicetypes()
    .then(res => res.json())
    .then(res => {
      this.service_types = res.data;
    })


    this.userService.getRental()
    .then(res => res.json())
    .then(res => {
      this.rentals = res.data;
    })

    this.userService.getGender()
    .then(res => res.json())
    .then(res => {
      this.genders = res.data;
    })

    this.userService.getRate()
    .then(res => res.json())
    .then(res => {
      this.rates = res.data;
    })

    this.userService.getDuration()
    .then(res => res.json())
    .then(res => {
      this.duration = res.data;
    })

    this.userService.getCaregiver('')
    .then(res => res.json())
    .then(res => {
      this.caregivers = res.data;
    })

  }

  showStaffServers(service:any){
    this.isServerStaffList = true;
    this.serviceType = service;
  }

  bookService(accepter_id:string){
    this.selectedAccepterID = accepter_id
    this.isShowServiceForm = this.serviceType;
    this.isServerStaffList = false;

  }

  startBooking(){
    switch(this.serviceType){
      case 'companion':
       this.userService.bookService(this.selectedAgenda, this.location, this.selectedDuration, this.notes, this.selectedRental, '','5', this.user_id, '', '', this.selectedAccepterID)
         this.document.location.href = "/dashboard"
         break;
   }


   console.log(this.selectedAgenda)
   console.log(this.selectedDuration)
   console.log(this.selectedGender)
   console.log(this.selectedRate)
   console.log(this.selectedRental)
   console.log(this.serviceType)
   console.log(this.notes)
   console.log(this.selectedAccepterID)

   //this.document.location.href = "/dashboard"
  }


  selectAgenda(data: string){
    this.selectedAgenda = data;
  }

  selectServiceType(data:string){
    this.selectedServiceType = data
  }

  selectRental(data: string){
    this.selectedRental = data
  }

  selectGender(data: string){
    this.selectedGender = data
    this.userService.getAvailableStaff('caregiver', data);
    console.log("UPDATE GENDER....")
  }

  selectRate(data: string){
    this.selectedRate = data
  }

  selectDuration(data: string){
    this.selectedDuration = data;
  }

  selectAccepter(data: string){
    this.selectedAccepterID = data;
  }


}
