import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {GoogleAuth, User} from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: any;
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
  gender: any
  rate: any
  lastname: any;
  firstname: any;
  middlename: any;
  bdate: any;
  address: any;
  ec_fullname: any;
  ec_relationship: any;
  ec_mobile: any;
  valid_id: any;
  isUserSignUp: boolean
  isHousekeeperSignUp: boolean;
  isCaregiverSignUp: boolean;
  isSMS: boolean;
  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file
  files: any[]=[]
  token: any;
  isMobile: boolean;
  navHome: any
  constructor(@Inject(DOCUMENT) private document: Document, private userService: UserService, private http: HttpClient, private router: Router){
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
    this.token = localStorage.getItem("user_token");
    this.isMobile=false;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit() {
    console.log("LOGIN PAGE....")
    if (Capacitor.getPlatform() === 'ios') {
      // do something
    }
    if (Capacitor.getPlatform() === 'android') {
      // do something
    }
    else{
      GoogleAuth.initialize();
    }
}
async signUpGoogle() {
  //User Authentication
  try {
    const user: User = await GoogleAuth.signIn();
    console.log(user)
    this.userService.debugger(JSON.stringify(user));
    this.isMobile = true;
    this.showSignUpForm = true;
    this.password = user.email
    this.username = user.email
    this.userService.saveSession('mobile','')
    this.userService.toastSuccess('Email Successfully verified', '')
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
  catch (error) {
    this.userService.debugger(String(error));
  }
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
    this.smsOTP = this.generateString(6)
    this.userService.sendSMS(this.mobile, `
Your OTP: ${this.smsOTP}
Valid for 5 minutes. Keep it safe.
CARECOM APP`
    )
  }

  verifyOTPinput(){
    if (this.verifyOTP.trim()==''){
      this.userService.toastError('Invalid OTP', 'Please try again.')
    }
    else if(this.OTPexpired){
      this.userService.toastError('OTP expired', 'Please resend an OTP again.')
    }
    else if(this.verifyOTP==this.smsOTP){
      this.isMobile = true;
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

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.status = "initial";
      this.file = file;
    }

    this.files.push(this.file?.name)
     // we will implement this method later
     if (this.file) {
      const formData = new FormData();

      formData.append('file', this.file, this.file.name);
      formData.append('username', this.username);
      const upload$ = this.http.post(this.userService.getApiHost()+"/user/upload", formData,{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
         });

      this.status = 'uploading';

      upload$.subscribe({
        next: () => {
          this.status = 'success';
        },
        error: (error: any) => {
          this.status = 'fail';
          return throwError(() => error);
        },
      });
    }

  }

  selectGender(data:string){
    this.gender = data;
  }

  signUpHousekeeper() {
    console.log('singup housekeeper..')
    if(this.isMobile){
      this.userService.signup(this.lastname, this.middlename, this.bdate, this.address, this.selectedRegion, this.selectedCity, this.selectedBrgy, '',
        this.ec_fullname, this.ec_relationship, this.ec_mobile, "3",this.valid_id, this.firstname, this.mobile, this.username, this.password, this.gender, this.rate)
    }
    else if(!this.mobile){
      this.userService.signup(this.lastname, this.middlename, this.bdate, this.address, this.selectedRegion, this.selectedCity, this.selectedBrgy, this.email,
        this.ec_fullname, this.ec_relationship, this.ec_mobile, "3",this.valid_id, this.firstname, '', this.username, this.password, this.gender, this.rate)
    }

  
    this.userService.toastSuccess('Success', 'Housekeeper Sign Up successfully')
   
    setTimeout(() => {
      this.document.location.href = "/login"
    }, 3000);


  }

  signUpCaregiver() {

    if(this.isMobile){
      this.userService.signup(this.lastname, this.middlename, this.bdate, this.address, this.selectedRegion, this.selectedCity, this.selectedBrgy, '',
        this.ec_fullname, this.ec_relationship, this.ec_mobile, "2",this.valid_id, this.firstname, this.mobile, this.username, this.password, this.gender, this.rate)
    }
    else if(!this.mobile){
      this.userService.signup(this.lastname, this.middlename, this.bdate, this.address, this.selectedRegion, this.selectedCity, this.selectedBrgy, this.email,
        this.ec_fullname, this.ec_relationship, this.ec_mobile, "2",this.valid_id, this.firstname, '', this.email, this.email, this.gender, this.rate)
    }


    this.userService.toastSuccess('Success', 'Caregiver Sign Up successfully')

    setTimeout(() => {
          this.document.location.href = "/login"
    }, 3000);



  }


  signUpUser() {

    if(this.isMobile){
      this.userService.signup(this.lastname, this.middlename, this.bdate, this.address, this.selectedRegion, this.selectedCity, this.selectedBrgy, '',
        this.ec_fullname, this.ec_relationship, this.ec_mobile, "1",this.valid_id, this.firstname, this.mobile, this.username, this.password, this.gender, this.rate)
    }
    else if(!this.mobile){
      this.userService.signup(this.lastname, this.middlename, this.bdate, this.address, this.selectedRegion, this.selectedCity, this.selectedBrgy, this.email,
        this.ec_fullname, this.ec_relationship, this.ec_mobile, "1",this.valid_id, this.firstname, '', this.email, this.email, this.gender, this.rate)
    }
    this.userService.toastSuccess('Success', 'User Sign Up successfully')

    setTimeout(() => {
      this.document.location.href = "/dashboard"
}, 3000);
  }


}
