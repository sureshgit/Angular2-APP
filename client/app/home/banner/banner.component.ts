import {Component } from '@angular/core';
import {Router } from '@angular/router';

@Component({
    selector: 'ss-banner',
    templateUrl: './banner.component.html',
  })
  export class BannerComponent {
    constructor(private router: Router) {}
    // ngOnInit() {
    // }
    search() {
       this.router.navigate(['business/sathupally']);
    }

  }

