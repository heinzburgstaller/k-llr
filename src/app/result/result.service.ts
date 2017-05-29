import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ResultService {

  public static readonly GROUP_TOKEN:string = 'cafedood';

  private csv_result: string = '';

  private data: string = JSON.stringify({
    "grouptoken": ResultService.GROUP_TOKEN,
    "usertoken": "string",
    "weights": {
      "bias": {
        "age": 0.37931034482758613,
        "education-num": 0.0689655172413793,
        "hours-per-week": 0.0689655172413793,
        "workclass": 0.0689655172413793,
        "native-country": 0.0689655172413793,
        "sex": 0.0689655172413793,
        "race": 0.0689655172413793,
        "relationship": 0.0689655172413793,
        "occupation": 0.0689655172413793,
        "marital-status": 0.0689655172413793
      },
      "iml": {
        "age": 0.13704865909390093,
        "education-num": 0.14385388791553647,
        "hours-per-week": 0.1279067106608888,
        "workclass": 0.11057201781371723,
        "native-country": 0.11958109916626228,
        "sex": 0.0958123676325629,
        "race": 0.12552706039834438,
        "relationship": 0.074162197318787,
        "occupation": 0.032768000000000005,
        "marital-status": 0.032768000000000005
      }
    },
    "csv": {
      "bias": this.csv_result,
      "iml": this.csv_result
    },
    "target": "income",
    // ===== OPTIONAL =====
    "user": {
      "token": "NjY6W29iamVjdCBPYmplY3RdOjE0OTU0NDI1NTI4MDk6dW5kZWZpbmVk",
      "education": {
        "id": 1,
        "description": "secondary modern school"
      },
      "age": 66,
      "username": "Anonym"
    },
    "survey": {
      "sid": 2,
      "target_column": "income",
    }
  });

  constructor(private http: Http) {
  }

  private getMessageBody(user: string, bias: any, iml: any,
    csvBias: string, csvIml: string, target: string): string {
    var data: string = JSON.stringify({
      "grouptoken": ResultService.GROUP_TOKEN,
      "usertoken": user,
      "weights": {
        "bias": bias,
        "iml": iml,
      },
      "csv": {
        "bias": csvBias,
        "iml": csvIml
      },
      "target": target,
    });

    return data;
  }

  postToServer(user: string, bias: any, iml: any,
    csvBias: string, csvIml: string, target: string) {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = this.getMessageBody(user, bias, iml,
      csvBias, csvIml, target);
    return this.http.post('http://berndmalle.com:5000/anonML', body, options).map((res: Response) => res.json());
  }

  post2() {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = this.data;
    console.log('in post2');
    return this.http.post('http://berndmalle.com:5000/anonML', body, options).map((res: Response) => res.json());
  }

  private post() {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });

    /*
        return this.http
          .post('http://berndmalle.com:5000/anonML', JSON.stringify(''), { headers: headers });

          */


    console.log(this.data);
    return this.http.post('http://berndmalle.com:5000/anonML', this.data, {
      headers: headers
    })
      .map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
