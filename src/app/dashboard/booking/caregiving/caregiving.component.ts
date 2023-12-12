import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DOCUMENT } from '@angular/common';
import {io} from 'socket.io-client';
import { Geolocation } from '@capacitor/geolocation';
import * as Leaflet from 'leaflet';
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
  age: any
  pet: any
  location: any
  serviceType: "" |"companion" | "personal_care" | "babysitting" | "errands" = "";
  token: any;
  user_id: any
  servicetype_id:any
  currentLat:any
  currentLong:any
  nearCC: any
  selectedChildCenter:any
  private socket = io('https://f0c6-66-85-26-53.ngrok-free.app',{
    extraHeaders: {
      "ngrok-skip-browser-warning" : "69420"
    }
  });
  constructor(@Inject(DOCUMENT) private document: Document, private userService: UserService){
      this.nearCC = []
      this.token = localStorage.getItem("user_token");
      this.selectedRental = 1
  }

  ngOnInit(): void {

    this.userCurrentPosition()


    this.userService.availableStaff.subscribe(
      (data: any) =>{
        this.caregivers = data.data;
    })
    this.userService.getProfile(this.token)
    .then(res => res.json())
    .then(res => {
      this.user_id = res.user_id
    })

    this.userService.getAgendaSelect(this.servicetype_id)
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

  userCurrentPosition = async () => { // GET USER CURRENT POSITION
    var self = this;
    let location = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: Infinity
    });
    const wait = Geolocation.watchPosition({enableHighAccuracy: true, timeout: 1000}, (position: any, err) => {
      console.log(err)
      console.log(position)

        this.currentLat = position.coords.latitude
        this.currentLong = position.coords.longitude
         // save dst coordinates

         this.userService.getChildCenters()
         .then(res => res.json())
         .then(res => {
           console.log(res)
           res.data.forEach( (value: any) => {
             console.log(value.name)
            var dist =  this.getDistanceKM([Number(this.currentLat), Number(this.currentLong)],[Number(value.lat), Number(value.long)])
            console.log( dist)
            if (Number(dist)<100){
              value['dist'] = dist
             this.nearCC.push(value)
             console.log(value)
            }

           });

         })


    });


    }

    getDistanceKM(dst:any,src:any){
      var fromLatLng = Leaflet.latLng(dst[0], dst[1]);
      var toLatLng = Leaflet.latLng(src[0], src[1]);
      var dis = fromLatLng.distanceTo(toLatLng);
      let distanceConversion = ((dis) / 1000).toFixed(0);
      let distanceKm = distanceConversion;
      console.log(distanceKm || 0, "km");
      return distanceKm || 0

    }

    nearChildCenter(){
      this.userService.getChildCenters()
      .then(res => res.json())
      .then(res => {
        var items_arr = []
        res.data.forEach( (value: any) => {
        var dist = this.getDistanceKM([Number(value.lat),Number(value.long)], [this.currentLat,  this.currentLat])
            if (Number(dist)<16){
              items_arr.push(dist)
            }

        });

      })
    }


  showStaffServers(service:any){
    this.isServerStaffList = true;
    this.serviceType = service;
    this.userService.getServices()
    .then(res => res.json())
    .then(res => {
        for(var i=0;i<res.data.length;i++){
          if (res.data[i].text==this.serviceType){
              this.servicetype_id = res.data[i].id
              this.userService.getAgendaSelect(res.data[i].id)
              .then(res => res.json())
              .then(res => {
                this.agendas = res.data;
              })
          }
        }
    })
  }

  bookService(accepter_id:string){
    this.selectedAccepterID = accepter_id
    this.isShowServiceForm = this.serviceType;
    this.isServerStaffList = false;

  }

  startBooking(){
    this.socket.emit('update_booking', {"id" : this.selectedAccepterID}); // listen and save src coordinates
    switch(this.serviceType){
      case 'companion':
       this.userService.bookService(this.selectedAgenda, this.location, this.selectedDuration, this.notes, 0, '0','5', this.user_id, '', '', this.selectedAccepterID, '1', '', '','')
       .then(res => res.json())
       .then(async res => {
        await this.userService.toastSuccess("Success", "Booked Successfully")

        setTimeout(() => {
          this.document.location.href = "/dashboard"
        }, 3000);

       })
       break;

       case 'personal_care':
        this.userService.bookService(this.selectedAgenda, this.location, this.selectedDuration, this.notes, this.selectedRental, '0','5', this.user_id, '', '', this.selectedAccepterID, '1', '', '','')
        .then(res => res.json())
        .then(async res => {
         await this.userService.toastSuccess("Success", "Booked Successfully")

         setTimeout(() => {
           this.document.location.href = "/dashboard"
         }, 3000);

        })
        break;


       case 'babysitting':
        this.userService.bookService(this.selectedAgenda, this.location, this.selectedDuration, this.notes, this.selectedRental, '0','5', this.user_id, this.pet, '', this.selectedAccepterID, '1', '', '','')
        .then(res => res.json())
        .then(async res => {
         await this.userService.toastSuccess("Success", "Booked Successfully")

         setTimeout(() => {
           this.document.location.href = "/dashboard"
         }, 3000);

        })
        break;

        case 'errands':
          this.userService.bookService(this.selectedAgenda, this.location, this.selectedDuration, this.notes, this.selectedRental, '0','5', this.user_id, '', '', this.selectedAccepterID, '1', '', '','')
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
    this.userService.getAvailableStaff('caregiver', data);
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

  selectChildCenter(data: string){
    localStorage.setItem('SelectedChildCenter', data)

  }

  showChildCenters(){
    this.userCurrentPosition()
  }


}
