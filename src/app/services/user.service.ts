import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host: string;
  showLogin = new Subject<boolean>();
  constructor() {
    this.host = 'http://localhost:8080'
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
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
  })
  }

  getBookings(){
    return fetch(this.host + '/book/list', {
      method: 'GET',
      headers: {}
  })
  }

  bookAccept(id: string){
    let data = new FormData()
    data.append('id', id)
    return fetch(this.host + '/book/accept', {
      method: 'POST',
      headers: {},
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


}
