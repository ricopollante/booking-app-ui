import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isUserSignUp: boolean

  constructor(){
    this.isUserSignUp = false;
  }

  showUserSignup(){
    this.isUserSignUp = true;
  }

}
