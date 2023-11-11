import { Component } from '@angular/core';

@Component({
  selector: 'app-caregiving',
  templateUrl: './caregiving.component.html',
  styleUrls: ['./caregiving.component.css']
})
export class CaregivingComponent {
  isShowServiceForm: "list" | "companion" | "personal_care" | "babysitting" | "errands" = "list";
  constructor(){

  }

  showCompanion(){
    this.isShowServiceForm = "companion";
  }
}
