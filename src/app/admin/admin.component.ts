import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { windowCount } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  isViewItem: any
  agendas: any
  durations:any
  rentals:any
  rates:any
  services:any

  itemId: any
  itemName: any
  rate: any
  agenda: any
  agenda_id:any
  duration: any
  duration_id:any
  rental: any
  rental_id:any
  isAddFormRates: any
  isAddFormRentals: any
  isAddFormDurations: any
  isAddFormAgendas: any
  servicetype: any

constructor(private userService: UserService){

  this.userService.getAgenda()
    .then(res => res.json())
    .then(res => {
      this.agendas = res.data;
    })

    this.userService.getServicetypes()
    .then(res => res.json())
    .then(res => {
      this.services = res.data;
    })


    this.userService.getRental()
    .then(res => res.json())
    .then(res => {
      this.rentals = res.data;
    })


    this.userService.getRate()
    .then(res => res.json())
    .then(res => {
      this.rates = res.data;
    })

    this.userService.getDuration()
    .then(res => res.json())
    .then(res => {
      this.durations = res.data;
    })

}

showItem(item:string){
  this.isViewItem = item
}

hideItem(){
  this.isViewItem = false
}

selectAgendaID(id:string){
  this.agenda_id = id;
  console.log(id)
}

selectRentalID(id:string){
  this.rental_id = id;
  console.log(id)
}

selectDurationID(id:string){
this.duration_id = id
}


submitAgendas(){
  this.isAddFormRates = false
  if (this.isViewItem=='agendas'){
    this.userService.addAgenda(this.agenda, this.servicetype, this.rate)
    setTimeout(() => {
      this.userService.toastSuccess('Success','Data Added')
      window.location.reload();
    }, 5000);

  }

}
deleteAgendas(){
  if (this.isViewItem=='agendas'){
      this.userService.deleteAgenda(this.agenda_id)
      setTimeout(() => {
        this.userService.toastSuccess('Success','Deleted')
        window.location.reload();
      }, 5000);

  }
}

showFormAgendas(){
  this.isAddFormAgendas = true
}

submitRental(){
  this.isAddFormRates = false
  if (this.isViewItem=='rentals'){
    this.userService.addRentals(this.rental, this.rate)
    setTimeout(() => {
      this.userService.toastSuccess('Success','Data Added')
      window.location.reload();
    }, 5000);

  }

}
deleteRental(){
  if (this.isViewItem=='rentals'){
      this.userService.deleteRental(this.rental_id)
      setTimeout(() => {
        this.userService.toastSuccess('Success','Deleted')
        window.location.reload();
      }, 5000);

  }
}







showFormRental(){
  this.isAddFormRentals = true
}



showFormDurations(){
  this.isAddFormDurations = true
}


submitDuration(){
  this.isAddFormRates = false
  if (this.isViewItem=='durations'){
    this.userService.addDuration(this.duration)
    setTimeout(() => {
      this.userService.toastSuccess('Success','Data Added')
      window.location.reload();
    }, 5000);

  }

}
deleteDuration(){
  if (this.isViewItem=='durations'){
      this.userService.deleteDuration(this.duration_id)
      setTimeout(() => {
        this.userService.toastSuccess('Success','Deleted')
        window.location.reload();
      }, 5000);

  }
}



selectService(service:string){
this.servicetype = service
}


}


