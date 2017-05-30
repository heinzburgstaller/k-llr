import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public isLoading:boolean = true;
  public r:any;
  public keysGetter = Object.keys;

  constructor() { }

  ngOnInit() {
  }

  setResponse(data:any) {
    this.r = data;
  }

}
