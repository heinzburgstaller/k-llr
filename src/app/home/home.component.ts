import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { DataArray1 } from './data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private timer;
  private sub: Subscription;

  public progressValue: number;
  @ViewChild('autoShownModal')
  public autoShownModal: ModalDirective;
  public isModalShown: boolean = false;

  public config: any = {
    paging: false,
    className: ['table-striped', 'table-bordered']
  };

  public columns: Array<any> = [
    { title: 'Age', name: 'age' },
    { title: 'ZIP', name: 'zip' },
    { title: 'Gender', name: 'gender' },
    { title: 'Country', name: 'country' },
    { title: 'Skin', name: 'skin' }
  ];

  public rows: Array<any> = [];

  constructor() {
    this.progressValue = 0;
  }

  ngOnInit() {
  }

  public startLearning(): void {
    if (this.progressValue >= 100) {
      return;
    }

    this.timer = Observable.timer(1500);
    // subscribing to a observable returns a subscription object
    this.sub = this.timer.subscribe(t => this.tickerFunc(t));
  }

  tickerFunc(tick) {
    this.progressValue += 20;
    this.sub.unsubscribe();

    this.showModal();
  }

  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.autoShownModal.hide();
    this.startLearning();
  }

  public onHidden(): void {
    this.isModalShown = false;
  }

  ngOnDestroy() {
  }

}
