import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataArray1 } from './data';
import { Adult } from './adult';
import { GaugeSegment, GaugeLabel } from 'ng2-kw-gauge';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {

  public colors: any = {
    indigo: '#14143e',
    pink: '#fd1c49',
    orange: '#ff6e00',
    yellow: '#f0c800',
    mint: '#00efab',
    cyan: '#05d1ff',
    purple: '#841386',
    white: '#fff'
  };

  private csvUrl: string = 'original_data_500_rows.csv';
  private adults: Array<Adult> = [];
  public option1Rows: Array<Adult> = [];
  public option2Rows: Array<Adult> = [];
  public decideRows: Array<Adult> = [];

  @Output() onOk = new EventEmitter<any>();

  constructor(private http: Http) {

  }

  ngOnInit() {
    this.readCsvData();
  }

  public dragEnter(event: any) {
    console.log(event);
    this.progressGraph1.segments[0].value = 55;
    this.progressGraph1.labels[1].text = '55%';
  }

  public dragDrop(event: any) {
    console.log(event);
    this.progressGraph1.segments[0].value = 100;
    this.progressGraph1.labels[1].text = '100%';
  }

  private readCsvData() {
    this.http.get(this.csvUrl)
      .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
      );
  }

  private extractData(res: Response) {
    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for (let i = 1; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        let a = new Adult();
        a.age = Number(data[0].trim());
        a.education_num = Number(data[1].trim());
        a.hours_per_week = Number(data[2].trim());
        a.workclass = data[3].trim();
        a.native_country = data[4].trim();
        a.sex = data[5].trim();
        a.race = data[6].trim();
        a.relationship = data[7].trim();
        a.occupation = data[8].trim();
        a.income = data[9].trim();
        a.marital_status = data[10].trim();
        this.adults.push(a);
      }
    }

    this.option1Rows = [this.adults[0], this.adults[1], this.adults[2]];
    this.option2Rows = [this.adults[0], this.adults[1], this.adults[2]];
    this.decideRows = [this.adults[3]];

    this.progressGraph1.segments[0].value = 10;
    this.progressGraph1.labels[1].text = '10%';
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

  // TODO not needed anymore
  setIndex(index: number): void {

  }

  public ok(): void {
    this.onOk.emit();
  }

  public progressGraph1: any = {
    bgRadius: 60,
    bgColor: this.colors.indigo,
    rounded: true,
    reverse: false,
    animationSecs: 1,
    labels: [
      new GaugeLabel({
        color: this.colors.white,
        text: 'Cost',
        x: 0,
        y: 20,
        fontSize: '1em'
      }),
      new GaugeLabel({
        color: this.colors.pink,
        text: '81%',
        x: 0,
        y: 0,
        fontSize: '2em'
      })
    ],
    segments: [
      new GaugeSegment({
        value: 81,
        color: this.colors.pink,
        borderWidth: 20
      })
    ]
  };

}
