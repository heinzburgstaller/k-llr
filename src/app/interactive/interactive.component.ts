import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataArray1 } from './data';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {

  private csvUrl: string = './original_data_500_rows.csv';

  public rows: Array<any> = [];

  public ageSelected: boolean = false;
  public zipSelected: boolean = false;
  public genderSelected: boolean = false;
  public countrySelected: boolean = false;
  public skinelected: boolean = false;

  @Output() onOk = new EventEmitter<any>();

  constructor(private http: Http) { }

  ngOnInit() {
    this.readCsvData();
  }

  private readCsvData() {
    debugger;
    this.http.get(this.csvUrl)
      .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
      );
  }

  private extractData(res: Response) {
    debugger;
    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for (let i = 0; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        let tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }
        lines.push(tarr);
      }
    }
    //this.csvData = lines;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

  setIndex(index: number): void {
    this.rows = [DataArray1[index]];
  }

  public ok(): void {
    this.onOk.emit();
  }

}
