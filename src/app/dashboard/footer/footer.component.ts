import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isAdmin: any
  constructor(private router: Router) {
    this.isAdmin = localStorage.getItem("is_admin")
   }

  ngOnInit(): void {
  }

  Home(){
    this.router.navigate(['/dashboard'])
  }

}
