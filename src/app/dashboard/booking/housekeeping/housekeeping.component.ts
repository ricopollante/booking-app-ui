import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-housekeeping',
  templateUrl: './housekeeping.component.html',
  styleUrls: ['./housekeeping.component.css']
})
export class HousekeepingComponent implements OnInit {
  isShowServiceForm: any | "laundry" | "toilet" | "carwash" | "chores" = "list";
  agendas: any
  service_types: any
  rentals: any
  genders: any
  rates: any
  duration: any
  notes: any
  isServerStaffList: any
  housekeepers: any
  selectedServiceType: any
  selectedAgenda: any
  selectedRental: any
  selectedGender: any
  selectedRate: any;
  selectedDuration: any;
  selectedAccepterID: any
  age: any
  pet: any
  location: any
  serviceType: "" |"laundry" | "toilet" | "carwash" | "chores" = "";
  token: any;
  user_id: any
  lot_area: any
  weight: any
  bathroom_size: any
  cars: any

constructor(@Inject(DOCUMENT) private document: Document, private userService: UserService){

}


ngOnInit(): void {


  this.userService.availableStaff.subscribe(
    (data: any) =>{
      this.housekeepers = data.data;
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
    this.housekeepers = res.data;
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
    case 'chores':
     this.userService.bookService(this.selectedAgenda, this.location, this.selectedDuration, this.notes, this.selectedRental, '0','5', this.user_id, '', '', this.selectedAccepterID, this.selectedRate, '', this.lot_area ,'')
     .then(res => res.json())
     .then(async res => {
      await this.userService.toastSuccess("Success", "Booked Successfully")

      setTimeout(() => {
        this.document.location.href = "/dashboard"
      }, 3000);

     })
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
 console.log(this.pet)
 console.log(this.selectedRate)

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
  this.userService.getAvailableStaff('housekeeper', data);
  console.log("UPDATE GENDER....")
}

selectRate(data: string){
  this.selectedRate = data
  console.log(data)
}

selectDuration(data: string){
  this.selectedDuration = data;
}

selectAccepter(data: string){
  this.selectedAccepterID = data;
}


}
