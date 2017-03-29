import { Component, OnInit } from '@angular/core';
import { DataArray1 } from './data';

@Component({
  selector: 'app-choose-anon',
  templateUrl: './choose-anon.component.html',
  styleUrls: ['./choose-anon.component.css']
})
export class ChooseAnonComponent implements OnInit {

  public rows: Array<any> = [];

  constructor() {
    this.rows = [DataArray1[0]];
   }

  ngOnInit() {
  }

}
