import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isAdmin: any
  constructor() {
    this.isAdmin = localStorage.getItem("is_admin")
   }

  ngOnInit(): void {
  }

}
