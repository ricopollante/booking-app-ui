import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  mobile: string;
  username: string;
  password: string;
  confirm_password: string;
  smsOTP: string
  showOTPVerify: boolean;
  verifyOTP: string;
  OTPexpired: boolean;
  OTPSec: number;
  OTPMin: number;
  showSignUpForm: boolean;
  selectedRegion: any;
  selectedCity: any;
  selectedBrgy: any;
  Regions: any;
  City: any;
  Barangay: any;
  lastname: any;
  firstname: any;
  middlename: any;
  bdate: any;
  address: any;
  ec_fullname: any;
  ec_relationship: any;
  ec_mobile: any;
  isUserSignUp: boolean
  isHousekeeperSignUp: boolean;
  isCaregiverSignUp: boolean;
  isSMS: boolean;
  constructor(private userService: UserService){
    this.isSMS = false;
    this.isHousekeeperSignUp = false;
    this.isCaregiverSignUp = false;
    this.showSignUpForm = false;
    this.OTPSec = 0;
    this.OTPMin = 0;
    this.OTPexpired = false;
    this.verifyOTP = ''
    this.showOTPVerify = false;
    this.mobile = '';
    this.username = '';
    this.password = '';
    this.confirm_password = ''
    this.smsOTP = '';
    this.isUserSignUp = false;
  }

  showUserSignup(){
    this.isUserSignUp = true;
  }

  showCaregiverSignup(){
    this.isCaregiverSignUp = true;
  }

  showHouseKeeperSignup(){
    this.isHousekeeperSignUp = true;
  }


generateString(length: number) {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.trim();
}


  sendOTPmobile(){
    this.OTPexpired = false;
    this.OTPMin = 4;
    this.OTPSec = 59;
    setInterval(() => {
      this.OTPSec = this.OTPSec - 1
      if (this.OTPSec<1)
      {this.OTPMin = this.OTPMin - 1}
      if(this.OTPSec < 1 && this.OTPMin < 1){
        this.OTPexpired = true;
      }
    }, 1000);
    this.showOTPVerify = true;
    this.mobile = this.mobile.replace("0","+63")
    this.smsOTP = "5" //this.generateString(6)
    //this.userService.sendOTP(this.mobile, `
// Your OTP: ${this.smsOTP}
// Valid for 5 minutes. Keep it safe.
// CARECOM APP`
//     )
  }

  verifyOTPinput(){
    if (this.verifyOTP.trim()==''){
      this.userService.toastError('Invalid OTP', 'Please try again.')
    }
    else if(this.OTPexpired){
      this.userService.toastError('OTP expired', 'Please resend an OTP again.')
    }
    else if(this.verifyOTP==this.smsOTP){
      this.showSignUpForm = true;
      this.userService.saveSession('username',this.username)
      this.userService.saveSession('password',this.password)
      this.userService.saveSession('mobile',this.mobile)
      this.userService.toastSuccess('Mobile Successfully verified', '')
      this.userService.getSession(this.username)
      .then(res => {
      console.log("session saved for: ", res)
      })
      this.userService.getPhRegions()
      .then(res => res.json())
      .then(res => {
       this.Regions = res;
      })
      this.userService.getPhCities()
      .then(res => res.json())
      .then(res => {
       this.City = res;
      })
      this.userService.getPhBrgys()
      .then(res => res.json())
      .then(res => {
       this.Barangay = res;
      })
    }
    else if(this.verifyOTP!=this.smsOTP){
      this.userService.toastError('Invalid OTP', 'Please try again.')
    }
  }

  selectRegion(region: string){
    this.selectedRegion = region
    console.log(this.selectedRegion)
  }
  selectCity(city: string){
    this.selectedCity = city
    console.log(this.selectedCity)
  }
  selectBrgy(brgy: string){
    this.selectedBrgy = brgy
    console.log(this.selectedBrgy)
  }
}
