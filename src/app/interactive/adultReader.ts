import { Adult } from './adult';
import { Http, Response } from '@angular/http';

export type ReaderCallback = (linesAsStrings: Array<string>, adults: Array<Adult>) => void;

export class AdultReader {

  private linesAsStrings: Array<string> = [];
  private adults: Array<Adult> = [];

  public readFromCSV(http: Http, callback: ReaderCallback): void {
    http.get('original_data_500_rows.csv')
      .finally(() => callback(this.linesAsStrings, this.adults))
      .subscribe(data => this.extractData(data), err => this.handleError(err)
      );
  }

  private extractData(res: Response) {
    let csvData = res['_body'] || '';
    this.linesAsStrings = csvData.split(/\r\n|\n/);
    let headers = this.linesAsStrings[0].split(',');
    let lines = [];

    var id_counter: number = 0;
    for (let i = 1; i < this.linesAsStrings.length; i++) {
      // split content based on comma
      let data = this.linesAsStrings[i].split(',');
      if (data.length == headers.length) {
        let a = new Adult();
        a.id = id_counter++;
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
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

}
