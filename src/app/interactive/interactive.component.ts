import { Component, OnInit } from '@angular/core';
import { DataArray1 } from './data';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {

  public rows: Array<any> = DataArray1;

  constructor() { }

  ngOnInit() {
  }

}
