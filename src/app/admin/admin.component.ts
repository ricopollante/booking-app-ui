import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  isViewItem: any
constructor(){

}

showItem(){
  this.isViewItem = true
}

hideItem(){
  this.isViewItem = false
}

}


