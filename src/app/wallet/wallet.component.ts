import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
isTopUp: boolean
isWithdraw: boolean
isActivity: boolean
amountTopup: any
amountWithdraw:any
wallet:any
walletTrans:any
token: any;
user_id: any
walletAmount: any
constructor(private userService: UserService){
this.isActivity = false
this.isTopUp = false
this.isWithdraw = false
this.token = localStorage.getItem("user_token");
this.userService.getProfile(this.token)

.then(res => res.json())
.then(res => {
  if (res){
    this.user_id = res.user_id

    setInterval(() => {
      this.userService.readWallet(res.user_id)
      .then(res => res.json())
      .then(res => {
        this.wallet = res;
        this.walletAmount = res.amount
        console.log(res)
      })
        this.userService.readWalletTrans(res.user_id)
      .then(res => res.json())
      .then(res => {
        this.walletTrans = res;
        console.log(res)
      })
    }, 10000);


  }
})

}

showTopUp(){
  this.isTopUp = true
}

showWithdraw(){
  this.isWithdraw = true
}

showTrans(){
  this.isActivity = true
}

deposit(){
  this.userService.depositWallet(this.user_id, this.amountTopup)
  this.userService.toastSuccess('Success', 'Top up deposited')
  setTimeout(() => {
    this.isTopUp = false
    window.location.reload();
  }, 3000);

}

withdraw(){
  if(this.wallet.amount < this.amountWithdraw){
    this.userService.toastError('Error', 'Insufficient Funds')
  }
  else{
    this.userService.withdrawWallet(this.user_id, this.amountWithdraw)
  this.userService.toastSuccess('Success', 'Amount withdrawed')
  setTimeout(() => {
    this.isTopUp = false
    window.location.reload();
  }, 3000);
  }

}


}
