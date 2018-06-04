import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ss-home',
    templateUrl: './home.component.html',
  })
  export class HomeComponent implements OnInit {

  constructor(private router: Router) {}
   ngOnInit() {

   }
   search() {
      this.router.navigate(['business/sathupally']);
   }
 }

