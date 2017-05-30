import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ResultService {

  public static readonly GROUP_TOKEN:string = 'cafedood';

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

}
