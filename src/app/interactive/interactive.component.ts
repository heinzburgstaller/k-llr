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
  public decidedRows1: Array<Adult> = [];
  public decidedRows2: Array<Adult> = [];
  private oldCosts: number = 0;

  @Output() onOk = new EventEmitter<any>();

  constructor(private http: Http) {

  }

  ngOnInit() {
    this.readCsvData();
  }

  private setGauge(value: number): void {
    if (value > 0) {
      this.progressGraph1.segments[0].value = value;
      this.progressGraph1.labels[1].text = value + '%';
    } else {
      this.progressGraph1.segments[0].value = 0;
      this.progressGraph1.labels[1].text = 'N/A';
    }
  }

  public dragStart(event: any) {
    this.oldCosts = this.progressGraph1.segments[0].value;
  }

  public dragLeave(event: any) {
    this.setGauge(this.oldCosts);
  }

  public dragOverOption1(event: any) {
    this.setGauge(74);
  }

  public dragOverOption2(event: any) {
    this.setGauge(43);
  }

  public dragDropOption1(event: any) {
    if (this.decideRows.length > 0) {
      this.decidedRows1.push(this.decideRows[0]);
      this.decideRows = [];
    }

    if (this.decidedRows2.length > 0) {
      this.decidedRows1.push(this.decidedRows2[0]);
      this.decidedRows2 = []
    }
  }

  public dragDropOption2(event: any) {
    if (this.decideRows.length > 0) {
      this.decidedRows2.push(this.decideRows[0]);
      this.decideRows = [];
    }

    if (this.decidedRows1.length > 0) {
      this.decidedRows2.push(this.decidedRows1[0]);
      this.decidedRows1 = []
    }
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
    this.setGauge(0);
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
        text: 'N/A',
        x: 0,
        y: 0,
        fontSize: '2em'
      })
    ],
    segments: [
      new GaugeSegment({
        value: 0,
        color: this.colors.pink,
        borderWidth: 20
      })
    ]
  };

}
