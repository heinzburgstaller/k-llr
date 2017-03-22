import { Component, OnInit } from '@angular/core';
import { DataArray1 } from './data';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {

  public rows: Array<any> = [];

  public ageSelected: boolean = false;
  public zipSelected: boolean = false;
  public genderSelected: boolean = false;
  public countrySelected: boolean = false;
  public skinelected: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  setIndex(index:number):void {
    this.rows = [DataArray1[index]];
  }

}
