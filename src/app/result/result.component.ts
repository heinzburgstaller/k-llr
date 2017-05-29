import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  private resultValues: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8];
  public imageUrl:string;
  public isLoading:boolean = true;
  public r:any;
  public keysGetter = Object.keys;

  constructor() { }

  ngOnInit() {
  }

  setResponse(data:any) {
    this.imageUrl = data.plotUrl;
    this.r = data;
  }

}
