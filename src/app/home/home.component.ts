import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { InteractiveComponent } from '../interactive/interactive.component';
import { SaNGreeA, StringGenHierarchy, ISaNGreeAConfig } from 'anonymiationjs';
import { Adult, AdultGen } from '../adult';
import { ReaderCallback, AdultReader } from '../adultReader';

import * as workclassGH from '../../genHierarchies/workclassGH.json';
import * as sexGH from '../../genHierarchies/sexGH.json';
import * as faceGH from '../../genHierarchies/raceGH.json';
import * as maritalStatusGH from '../../genHierarchies/marital-statusGH.json';
import * as nativeCountryGH from '../../genHierarchies/native-countryGH.json';
import * as relationshipGH from '../../genHierarchies/relationshipGH.json';
import * as occupationGH from '../../genHierarchies/occupationGH.json';
import * as incomeGH from '../../genHierarchies/incomeGH.json';

import * as $A from 'anonymiationjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  private adultReader: AdultReader = new AdultReader();
  private sangreea: SaNGreeA;
  private genHierarchies: Array<any> = [workclassGH, sexGH, faceGH,
    maritalStatusGH, nativeCountryGH, relationshipGH, occupationGH, incomeGH];
  private csvLines: Array<string>
  private adults: Array<Adult> = [];

  public progressValue: number = 50;
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

  constructor(private http: Http) {
    this.progressValue = 0;
  }

  ngOnInit() {
    this.adultReader.readFromCSV(this.http, this.readFromCSVcallback);
  }

  private readFromCSVcallback: ReaderCallback = (l: Array<string>, a: Array<Adult>): void => {
    this.adults = a;
    this.csvLines = l;
    this.configureSangreea();
  }

  private configureSangreea(): void {
    var config:ISaNGreeAConfig = $A.config.adults;
    config.NR_DRAWS = this.adults.length * 0.5;
    config.K_FACTOR = 2;

    this.sangreea = new $A.algorithms.Sangreea("testus", config);
    for (let genHierarchy of this.genHierarchies) {
      let jsonx: string = JSON.stringify(genHierarchy);
      let strgh = new $A.genHierarchy.Category(jsonx);
      this.sangreea.setCatHierarchy(strgh._name, strgh);
    }

    //debugger;
    this.sangreea.instantiateGraph(this.csvLines, false);
    this.sangreea.anonymizeGraph();
    //debugger;
  }

  ngAfterViewInit() {
  }

  public startLearning(): void {
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
  }

  public onShown(): void {
    this.interactive.configure(this.sangreea, this.adults);
  }

  public onHidden(): void {
    this.isModalShown = false;
  }

}
