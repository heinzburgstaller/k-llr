import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { InteractiveComponent } from '../interactive/interactive.component';
import { VectorComponent } from '../vector/vector.component';
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

  public static USER_QUERIES_PER_K: number = 1;
  public static STOP_AT_K: number = 7;

  private adultReader: AdultReader = new AdultReader();
  private sangreea: SaNGreeA;
  private genHierarchies: Array<any> = [workclassGH, sexGH, faceGH,
    maritalStatusGH, nativeCountryGH, relationshipGH, occupationGH, incomeGH];
  private csvLines: Array<string>
  private adults: Array<Adult> = [];
  public isInteractive: boolean = false;

  private progressValue: number = 0;
  @ViewChild(InteractiveComponent)
  public interactive: InteractiveComponent;
  @ViewChild(VectorComponent)
  public vectorComponent: VectorComponent;
  @ViewChild('configModal')
  public configModal: ModalDirective;

  private userQueryCounter: number;
  private targetColumn: string;

  constructor(private http: Http) {
    this.progressValue = 0;
  }

  ngOnInit() {
    this.adultReader.readFromCSV(this.http, this.readFromCSVcallback);
  }

  private readFromCSVcallback: ReaderCallback = (l: Array<string>, a: Array<Adult>): void => {
    this.adults = a;
    this.csvLines = l;
  }

  private configureSangreea(vector: any): void {
    var config: ISaNGreeAConfig = $A.config.adults;
    config.NR_DRAWS = this.adults.length;
    config.K_FACTOR = 2;
    config['GEN_WEIGHT_VECTORS']['equal'] = vector;

    this.sangreea = new $A.algorithms.Sangreea("testus", config);
    for (let genHierarchy of this.genHierarchies) {
      let jsonx: string = JSON.stringify(genHierarchy);
      let strgh = new $A.genHierarchy.Category(jsonx);
      this.sangreea.setCatHierarchy(strgh._name, strgh);
    }

    this.sangreea.instantiateGraph(this.csvLines, false);
    this.sangreea.getConfig().K_FACTOR = 2;
    this.sangreea.anonymizeGraph(72);
  }

  ngAfterViewInit() {
  }

  public startConfig(): void {
    this.configModal.show();
  }

  public startLearning(): void {
    var v: any = this.vectorComponent.createVector();
    this.targetColumn = this.vectorComponent.getTargetColumn();
    this.configureSangreea(v);

    this.configModal.hide();

    this.userQueryCounter = 0;
    this.progressValue = 0;
    this.isInteractive = true;

    this.interactive.configure(this.sangreea, this.adults, this.progressValue, this.targetColumn);
  }

  onInteractiveOk() {
    this.userQueryCounter++;
    this.progressValue = this.progressValue +
      (100 / (HomeComponent.USER_QUERIES_PER_K * (HomeComponent.STOP_AT_K - 2)));

    if (this.userQueryCounter == HomeComponent.USER_QUERIES_PER_K) {
      this.sangreea.getConfig().K_FACTOR++;
      this.userQueryCounter = 0;
      console.log(this.sangreea.getConfig().K_FACTOR);
      this.sangreea.updateCurrentClusters();
      if (this.sangreea.getConfig().K_FACTOR == HomeComponent.STOP_AT_K) {
        this.isInteractive = false;
        return;
      }
    }

    this.interactive.configure(this.sangreea, this.adults, this.progressValue, this.targetColumn);
  }

}
