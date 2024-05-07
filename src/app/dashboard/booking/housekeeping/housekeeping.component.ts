import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import {io} from 'socket.io-client';
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
  servicetype_id:any
  rentalsSelected: any
  showBill: boolean
  walletBalance: number
  bill: number
  underCredit: boolean;
  base_bill: number
  private socket = io('https://9059-66-85-26-53.ngrok-free.app',{
    extraHeaders: {
      "ngrok-skip-browser-warning" : "69420"
    }
  });
constructor(@Inject(DOCUMENT) private document: Document, private userService: UserService){
  this.token = localStorage.getItem("user_token");
  this.rentalsSelected = []
  this.selectedRental = 1
  this.showBill = false
  this.walletBalance = 0
  this.bill = 0
  this.selectedDuration = false
  this.underCredit = false
  this.base_bill = 0
}


ngOnInit(): void {

  this.userService.getProfile(this.token)
  .then(res => res.json())
  .then(res => {
    console.log(res)
    this.user_id = res.user_id
    this.userService.readWallet(res.user_id)
    .then(res => res.json())
    .then(res => {
      this.walletBalance = Number(res.amount);
      console.log(res)
    })
  })

  this.userService.availableStaff.subscribe(
    (data: any) =>{
      this.housekeepers = data.data;
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

  this.userService.getHousekeeper('')
  .then(res => res.json())
  .then(res => {
    this.housekeepers = res.data;
  })

  this.userService.isServiceForm.subscribe(
    (data: any) =>{
      if(!data){
        this.isServerStaffList = true
        console.log('hide service form......')
      }
  })

  this.userService.isStaffServerlist.subscribe(
    (data: any) =>{
      if(!data){
        this.isServerStaffList = false;
        console.log('hide service form......')
      }
  })


}

showStaffServers(service:any){
  this.userService.showStaffserverlist()
  this.isServerStaffList = true;
  this.serviceType = service;
  this.userService.getServices()
  .then(res => res.json())
  .then(res => {
      for(var i=0;i<res.data.length;i++){
        if (res.data[i].text==this.serviceType){
            this.servicetype_id = res.data[i].id
            console.log(res.data[i].id)
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
  this.showBill = true
  this.userService.serviceFormEnable()
}

startBooking(){
  if(this.underCredit){
    this.userService.toastError("Booking error","Insufficient Funds, Please add funds to your wallet.")
  }
  else{
    this.socket.emit('update_booking', {"id" : this.selectedAccepterID});  // listen and save src coordinates


  switch(this.serviceType){
    case 'chores':
     this.userService.bookService('25', this.location, this.selectedDuration, this.notes, this.selectedRental, '0','5', this.user_id, '', '', this.selectedAccepterID, this.selectedRate, '', this.lot_area ,'')
     .then(res => res.json())
     .then(async res => {
      this.rentalsSelected.forEach( (value: any) => {
        this.userService.bookRental(res.book_id, value, this.user_id)
      });
      await this.userService.saveBill(this.bill.toString(), this.user_id, this.selectedAccepterID, this.base_bill.toString(), res.bookid)
      await this.userService.toastSuccess("Success", "Booked Successfully")

      setTimeout(() => {
        this.document.location.href = "/dashboard"
      }, 3000);

     })
     break;
     case 'laundry':
     this.userService.bookService(this.selectedAgenda, this.location, this.selectedDuration, this.notes, this.selectedRental, '0','5', this.user_id, '', '', this.selectedAccepterID, this.selectedRate, '', this.lot_area ,'')
     .then(res => res.json())
     .then(async res => {
      this.rentalsSelected.forEach( (value: any) => {
        this.userService.bookRental(res.book_id, value, this.user_id)
      });
      await this.userService.saveBill(this.bill.toString(), this.user_id, this.selectedAccepterID, this.base_bill.toString(), res.bookid)
      await this.userService.toastSuccess("Success", "Booked Successfully")

      setTimeout(() => {
        this.document.location.href = "/dashboard"
      }, 3000);

     })
     break;
     case 'carwash':
      this.userService.bookService('25', this.location, this.selectedDuration, this.notes, this.selectedRental, '0','5', this.user_id, '', '', this.selectedAccepterID, this.selectedRate, '', this.lot_area ,'')
      .then(res => res.json())
      .then(async res => {
        this.rentalsSelected.forEach( (value: any) => {
          this.userService.bookRental(res.book_id, value, this.user_id)
        });
        await this.userService.saveBill(this.bill.toString(), this.user_id, this.selectedAccepterID, this.base_bill.toString(), res.bookid)
       await this.userService.toastSuccess("Success", "Booked Successfully")

       setTimeout(() => {
         this.document.location.href = "/dashboard"
       }, 3000);

      })
      break;
      case 'toilet':
        this.userService.bookService(this.selectedAgenda, this.location, this.selectedDuration, this.notes, this.selectedRental, '0','5', this.user_id, '', '', this.selectedAccepterID, this.selectedRate, '', this.lot_area ,'')
        .then(res => res.json())
        .then(async res => {
          this.rentalsSelected.forEach( (value: any) => {
            this.userService.bookRental(res.book_id, value, this.user_id)
          });
          await this.userService.saveBill(this.bill.toString(), this.user_id, this.selectedAccepterID, this.base_bill.toString(), res.bookid)
         await this.userService.toastSuccess("Success", "Booked Successfully")

         setTimeout(() => {
           this.document.location.href = "/dashboard"
         }, 3000);

        })
        break;
  }

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

chargeAgenda(agenda: string){
  console.log("charging total....")
    this.userService.getBillAgenda(agenda,this.selectedDuration)
    .then(res => res.json())
    .then(res => {
      console.log(res)
    this.bill = this.bill + res.rate
    if(this.bill>this.walletBalance){
      this.underCredit = true
      this.userService.toastError("Booking Error","Insufficient Funds, Please add funds to your wallet.")
    }
    if(this.bill<=this.walletBalance){
      this.underCredit = false
    }
    });
    this.userService.getBillRental(agenda,'2')
    .then(res => res.json())
    .then(res => {
      console.log(res)
    this.base_bill = this.base_bill + res.rate
    });
}

chargeRental(rental: string){
    console.log("charging total....")
      this.userService.getBillRental(rental,this.selectedDuration)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      this.bill = this.bill + res.rate
      if(this.bill>this.walletBalance){
        this.underCredit = true
        this.userService.toastError("Booking Error","Insufficient Funds, Please add funds to your wallet.")
      }
      if(this.bill<=this.walletBalance){
        this.underCredit = false
      }
      this.userService.getBillRental(rental,'2')
      .then(res => res.json())
      .then(res => {
        console.log(res)
      this.base_bill = this.base_bill + res.rate
      });
      });

}

dechargeRental(rental: string){
  console.log("charging total....")
    this.userService.getBillRental(rental,this.selectedDuration)
    .then(res => res.json())
    .then(res => {
      console.log(res)
    this.bill = this.bill - res.rate
    });
    if(this.bill>this.walletBalance){
      this.underCredit = true
      this.userService.toastError("Booking Error","Insufficient Funds, Please add funds to your wallet.")
    }
    if(this.bill<=this.walletBalance){
      this.underCredit = false
    }
    this.userService.getBillRental(rental,'2')
    .then(res => res.json())
    .then(res => {
      console.log(res)
    this.base_bill = this.base_bill - res.rate
    });
}



selectAgenda(data: string){
  this.selectedAgenda = data;
  this.chargeAgenda(data)
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
  this.bill = 0
  this.chargeAgenda(this.selectedAgenda)
  this.rentalsSelected.forEach( (value: any) => {
    this.chargeRental(value)
  });
}

selectAccepter(data: string){
  this.selectedAccepterID = data;
}

selectRentals(event: any){
  if(event.target.checked){
    console.log(event.target.value,"checked")
    this.rentalsSelected.push(event.target.value)
    this.chargeRental(event.target.value)
  }
  else{
    console.log(event.target.value,"unchecked")
    const index = this.rentalsSelected.indexOf(event.target.value);
    console.log(index);
    if (index !== -1) {
      this.rentalsSelected.splice(index, 1);
    }
    this.dechargeRental(event.target.value)
  }

}


}
