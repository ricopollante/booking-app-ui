import { Component } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
isTopUp: boolean
isWithdraw: boolean
amountTopup: any
amountWithdraw:any
constructor(){
this.isTopUp = false
this.isWithdraw = false
}

showTopUp(){
  this.isTopUp = true
}

showWithdraw(){
  this.isWithdraw = true
}

}
