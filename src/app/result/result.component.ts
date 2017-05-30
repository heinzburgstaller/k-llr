import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public isLoading:boolean = true;
  public r:any;
  public targetColumn:string;
  public keysGetter = Object.keys;
  public biasV:any;
  public imlV:any;

  constructor() { }

  ngOnInit() {
  }

  setResponse(data:any) {
    this.r = data;
  }

}
