import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { InteractiveComponent } from '../interactive/interactive.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private timer;
  private sub: Subscription;

  public progressValue: number;
  @ViewChild('autoShownModal')
  public autoShownModal: ModalDirective;
  public isModalShown: boolean = false;
  @ViewChild(InteractiveComponent)
  public interactive: InteractiveComponent;

  public valueAge: number = 50;
  public valueEducation: number = 50;
  public valueWorkTime: number = 50;
  public valueCountry: number = 50;
  public valueSex: number = 50;
  public valueRelationship: number = 50;
  public valueOccupation: number = 50;
  public valueIncome: number = 50;
  public valueRace: number = 50;
  public valueMarital: number = 50;

  constructor() {
    this.progressValue = 0;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  public startLearning(): void {
    if (this.progressValue >= 100) {
      return;
    }

    this.timer = Observable.timer(1500);
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

  onInteractiveOk() {
    this.hideModal();
  }

  public hideModal(): void {
    this.autoShownModal.hide();
    this.startLearning();
  }

  public onShown(): void {
    this.interactive.setIndex(this.progressValue / 20 - 1);
  }

  public onHidden(): void {
    this.isModalShown = false;
  }

  ngOnDestroy() {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

}
