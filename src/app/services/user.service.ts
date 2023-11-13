import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  host: string;
  socketioHost: string;
  showLogin = new Subject<boolean>();
  locSrc = new Subject<any>();
  locDst = new Subject<any>();
  availableStaff = new Subject<any>();
  bookinglistWaiting = new Subject<any>();
  bookinglistAccepted = new Subject<any>();
  channels = new Subject<any>();
  messages = new Subject<any>();
  constructor(private toastrService: ToastrService) {
    //this.host = 'http://10.42.0.67:8080'
    //this.host = 'http://localhost:8080'
    //this.host = 'http://192.168.1.31:8080'
    //this.host = 'https://43f0-58-69-61-224.ngrok.io';
    this.host = 'https://767d-110-54-130-215.ngrok-free.app'
    this.socketioHost = 'https://5d33-110-54-130-215.ngrok-free.app'
   }


  login(username: string, password: string){
    let data = new FormData()
    data.append('username', username)
    data.append('password', password)
    return fetch(this.host + '/user/login', {
      method: 'POST',
      headers: {},
      body: data
  })
  }

  logout(){
    localStorage.setItem("user_token", '')
  }

  getProfile(token: string){
    return fetch(this.host + '/user/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
  })
  }

  getBookings(id: string, type:string, status:string){
    let data = new FormData()
    if (type=="user"){
      data.append('userid', id)
    }
    else if(type=="accepter"){
      data.append('accepter_id', id)
    }
    data.append('status', status)
    return fetch(this.host + '/book/list', {
      method: 'POST',
      headers: {},
      body: data
  })
  }

  bookAccept(id: string, token: string){
    let data = new FormData()
    data.append('id', id)
    return fetch(this.host + '/book/accept', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
  })
  }

  bookService(agenda: string, location: string, duration: string, notes: string, rentals: string, prefgender: string, service_type:string, user_id:string, pet:string, cars_count:string, accepter_id:string, rate: string){
    let data = new FormData()
    data.append('agenda', agenda)
    data.append('location', location)
    data.append('duration', duration)
    data.append('notes', notes)
    data.append('rentals', rentals)
    data.append('prefgender', prefgender)
    data.append('service_type', service_type)
    data.append('user_id', user_id)
    data.append('pet', pet)
    data.append('cars_count', cars_count)
    data.append('accepter_id', accepter_id)
    data.append('rate', rate)
    return fetch(this.host + '/book/service', {
      method: 'POST',
      headers: {},
      body: data
  })
  }

  showLoginPage(){
    this.showLogin.next(true)
  }

  hideLoginPage(){
    this.showLogin.next(false);
  }


  debugger(logs: string){
    let data = new FormData()
    data.append('logs', logs)
    return fetch(this.host + '/user/logger', {
      method: 'POST',
      headers: {},
      body: data
  })
  }

  setSrc(lat: number, long: number){
    this.locSrc.next({"lat" : lat, "long" : long})
  }


  setDst(lat: number, long: number){
    this.locDst.next({"lat" : lat, "long" : long})
  }

  getChannel(token: string){
    return fetch(this.host + '/user/get_uuid', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
  })
  }

  async saveSession(key: string, value: any){
    await Preferences.set({
      key: key,
      value: value
    });
  }

  async getSession(key: string){
    const ret = await Preferences.get({ key: key });
    const user = ret.value
    return user
  }

  sendOTP(receiver: string, message: string){
    let apiKey = "ixxbHzeryU-kZBIAJRD_x76xlblaTugUeiUtEbGXEmk7J1LGc911pe_ow7fGNJ5i";

    fetch('https://api.httpsms.com/v1/messages/send', {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "content": message,
            "from": "+639959462351",
            "to": receiver
        })
    })
    .then(res => res.json())
    .then((data) => console.log(data));
      }

getPhRegions(){
  return fetch('https://psgc.gitlab.io/api/regions/', {
    method: 'GET',
    headers: {}
})
}


getPhCities(){
  return fetch('https://psgc.gitlab.io/api/cities/', {
    method: 'GET',
    headers: {}
})
}


getPhBrgys(){
  return fetch('https://psgc.gitlab.io/api/barangays/', {
    method: 'GET',
    headers: {}
})
}

signup(lastname: string, midname:string, bdate:string, address:string, region:string, city:string, barangay:string, email:string,
  ec_fullname:string, ec_relationship:string,ec_mobile:string,user_type:string,validid:string, firstname:string,mobile:string,username:string,password:string, gender: string, rate:string){
  var formdata = new FormData();
formdata.append("lastname",username);
formdata.append("midname", midname);
formdata.append("bdate", bdate);
formdata.append("address", address);
formdata.append("region", region);
formdata.append("city", city);
formdata.append("barangay", barangay);
formdata.append("email", email);
formdata.append("ec_fullname", ec_fullname);
formdata.append("ec_relationship", ec_relationship);
formdata.append("ec_mobile",ec_mobile);
formdata.append("user_type", user_type);
formdata.append("validid", validid);
formdata.append("firstname", firstname);
formdata.append("mobile", mobile);
formdata.append("username", username);
formdata.append("password", password);
formdata.append("gender", gender);
formdata.append("rate", rate);
  return fetch(this.host + '/user/signup', {
    method: 'POST',
    headers: {},
    body: formdata
  })
}

getServicetypes(){
  return fetch(this.host+"/book/service/types", {
    method: 'POST',
    headers: {}
})
}
getAgenda(){
  return fetch(this.host+"/book/service/agenda", {
    method: 'POST',
    headers: {}
})
}

getDuration(){
  return fetch(this.host+"/book/service/duration", {
    method: 'POST',
    headers: {}
})
}


getRental(){
  return fetch(this.host+"/book/service/rental", {
    method: 'POST',
    headers: {}
})
}

getGender(){
  return fetch(this.host+"/book/service/gender", {
    method: 'POST',
    headers: {}
})
}

getRate(){
  return fetch(this.host+"/book/service/rate", {
    method: 'POST',
    headers: {}
})
}

getCaregiver(gender:string){
  var formdata = new FormData();
  formdata.append("gender", gender);
  return fetch(this.host+"/user/list/caregiver", {
    method: 'POST',
    headers: {},
    body: formdata
})
}


getHousekeeper(gender:string){
  var formdata = new FormData();
  formdata.append("gender", gender);
  return fetch(this.host+"user/list/housekeeper", {
    method: 'POST',
    headers: {},
    body: formdata
})
}



toastError(error: string, body: string) {
        this.toastrService.error(body, error);
      }

toastSuccess(success: string, body: string) {
        this.toastrService.success(body, success);
      }

getApiHost(){
  return this.host
}

getSocketioHost(){
  return this.socketioHost
}

getAvailableStaff(stafftype:string, gender:string){

    if(stafftype == 'caregiver'){
      this.getCaregiver(gender)
      .then(res => res.json())
      .then(res => {
          this.availableStaff.next(res);
      })
    }
    else if(stafftype == 'housekeeper'){
      this.getHousekeeper(gender)
      .then(res => res.json())
      .then(res => {
          this.availableStaff.next(res);
      })
    }
}

listBookingwaiting(id: string, accepter:string, status:string){
  this.getBookings(id, accepter, status)
  .then(res => res.json())
      .then(res => {
          this.bookinglistWaiting.next(res)
      })
}

listBookingaccepted(id: string, accepter:string, status:string){
  this.getBookings(id, accepter, status)
  .then(res => res.json())
      .then(res => {
          this.bookinglistAccepted.next(res)
      })
}


createChannelMessage(sender_id:string, receiver_id:string){
  var formdata = new FormData();
  formdata.append("sender_userid", sender_id);
  formdata.append("receiver_userid", receiver_id);
  return fetch(this.host+"/user/create_channel", {
    method: 'POST',
    headers: {},
    body: formdata
})
}

getAllChannelOfMessage(user_id: string){
  var formdata = new FormData();
  formdata.append("user_id", user_id);
  return fetch(this.host + '/user/select_channel', {
    method: 'POST',
    headers: {
    },
    body: formdata
})
}

getMyMessages(uuid: string){
  var formdata = new FormData();
  formdata.append("uuid", uuid);
  return fetch(this.host + '/user/get_message', {
    method: 'POST',
    headers: {
    },
    body: formdata
})
}

saveMessage(user_id:string, uuid:string, body:string){
  var formdata = new FormData();
  formdata.append("uuid", uuid);
  formdata.append("user_id", user_id);
  formdata.append("body", body);
  return fetch(this.host + '/user/save_message', {
    method: 'POST',
    headers: {
    },
    body: formdata
})
}

updateChannels(user_id: string){
  this.getAllChannelOfMessage(user_id)
  .then(res => res.json())
  .then(res => {
    this.channels.next(res)
  })
}


updateMessages(uuid: string){
  this.getMyMessages(uuid)
  .then(res => res.json())
  .then(res => {
    this.messages.next(res)
  })
}



}
