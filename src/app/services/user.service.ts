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
  showLogin = new Subject<boolean>();
  locSrc = new Subject<any>();
  locDst = new Subject<any>();
  constructor(private toastrService: ToastrService) {
    //this.host = 'http://10.42.0.67:8080'
    //this.host = 'http://localhost:8080'
    //this.host = 'http://192.168.1.31:8080'
    //this.host = 'https://43f0-58-69-61-224.ngrok.io';
    this.host = 'https://5d2e-58-69-61-224.ngrok-free.app'
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

  getBookings(){
    return fetch(this.host + '/book/list', {
      method: 'POST',
      headers: {}
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

  bookService(agenda: string, location: string, duration: string, notes: string, rentals: string, prefgender: string){
    let data = new FormData()
    data.append('agenda', agenda)
    data.append('location', location)
    data.append('duration', duration)
    data.append('notes', notes)
    data.append('rentals', rentals)
    data.append('prefgender', prefgender)
    return fetch(this.host + '/book/caregiver', {
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


toastError(error: string, body: string) {
        this.toastrService.error(body, error);
      }

toastSuccess(success: string, body: string) {
        this.toastrService.success(body, success);
      }

}
