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
  duration: any
  rental: any
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

showAddFormRates(id:string, item:string){
  this.isAddFormRates = true
  this.itemId = id
  this.itemName = item
}
submitRates(){
  this.isAddFormRates = false
  if (this.itemName=='rates'){
    this.userService.addRates(this.rate)
    setTimeout(() => {
      this.userService.toastSuccess('Success','Data Added')
      window.location.reload();
    }, 5000);

  }

}
deleteRates(id:string){
  if (this.isViewItem=='rates'){
      this.userService.deleteRates(id)
      setTimeout(() => {
        this.userService.toastSuccess('Success','Deleted')
        window.location.reload();
      }, 5000);

  }
}

submitAgendas(){
  this.isAddFormRates = false
  if (this.isViewItem=='agendas'){
    this.userService.addAgenda(this.agenda, this.servicetype)
    setTimeout(() => {
      this.userService.toastSuccess('Success','Data Added')
      window.location.reload();
    }, 5000);

  }

}
deleteAgendas(id:string){
  if (this.isViewItem=='agendas'){
      this.userService.deleteRates(id)
      setTimeout(() => {
        this.userService.toastSuccess('Success','Deleted')
        window.location.reload();
      }, 5000);

  }
}


submitRentals(){
  this.isAddFormRates = false
  if (this.isViewItem=='rentals'){
    this.userService.addRentals(this.rental)
    setTimeout(() => {
      this.userService.toastSuccess('Success','Data Added')
      window.location.reload();
    }, 5000);

  }

}

showFormRentals(){
  this.isAddFormRentals = true
}


showFormAgendas(){
  this.isAddFormAgendas = true
}


selectService(service:string){
this.servicetype = service
}


}


