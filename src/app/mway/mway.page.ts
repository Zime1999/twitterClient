import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mway',
  templateUrl: './mway.page.html',
  styleUrls: ['./mway.page.scss'],
})
export class MwayPage implements OnInit {
  slideOpts = {
    effect: 'flip'
  };
  constructor() { }

  ngOnInit() {
  }

}
