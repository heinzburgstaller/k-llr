import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InteractiveComponent } from '../interactive/interactive.component';
import { VectorComponent } from '../vector/vector.component';
import { VectorHelper} from '../vector/vectorHelper';
import { SaNGreeA, StringGenHierarchy, ISaNGreeAConfig } from 'anonymizationjs';
import { Adult, AdultGen } from '../adult';
import { ReaderCallback, AdultReader } from '../adultReader';
import { ResultComponent } from '../result/result.component';
import { ResultService } from '../result/result.service';

import * as workclassGH from '../../genHierarchies/workclassGH.json';
import * as sexGH from '../../genHierarchies/sexGH.json';
import * as raceGH from '../../genHierarchies/raceGH.json';
import * as maritalStatusGH from '../../genHierarchies/marital-statusGH.json';
import * as nativeCountryGH from '../../genHierarchies/native-countryGH.json';
import * as relationshipGH from '../../genHierarchies/relationshipGH.json';
import * as occupationGH from '../../genHierarchies/occupationGH.json';
import * as incomeGH from '../../genHierarchies/incomeGH.json';

import * as $A from 'anonymizationjs';

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
  private sangreeaNonIml: SaNGreeA;
  private csvLines: Array<string>
  private adults: Array<Adult> = [];
  public isInteractive: boolean = false;
  public showResult: boolean = false;

  private progressValue: number = 0;
  @ViewChild(InteractiveComponent)
  public interactive: InteractiveComponent;
  @ViewChild(VectorComponent)
  public vectorComponent: VectorComponent;
  @ViewChild('configModal')
  public configModal: ModalDirective;
  @ViewChild(ResultComponent)
  public resultComponent: ResultComponent;

  private userQueryCounter: number;
  private targetColumn: string;

  constructor(private http: Http, private resultService: ResultService) {
    this.progressValue = 0;
  }

  ngOnInit() {
    this.adultReader.readFromCSV(this.http, this.readFromCSVcallback);
  }

  private readFromCSVcallback: ReaderCallback = (l: Array<string>, a: Array<Adult>): void => {
    this.adults = a;
    this.csvLines = l;
  }

  private getGenHierarchies(): Array<any> {
    if (this.targetColumn == 'income') {
      return [workclassGH, sexGH, raceGH,
        maritalStatusGH, nativeCountryGH, relationshipGH, occupationGH];
    }

    if (this.targetColumn == 'marital-status') {
      return [workclassGH, sexGH, raceGH,
        nativeCountryGH, relationshipGH, occupationGH, incomeGH];
    }

    return [workclassGH, sexGH, raceGH,
      maritalStatusGH, nativeCountryGH, relationshipGH, occupationGH, incomeGH];
  }

  private configureSangreea(vector: any): void {
    var config: ISaNGreeAConfig = $A.config.adults;
    config.NR_DRAWS = this.adults.length;
    config.K_FACTOR = 2;
    config['GEN_WEIGHT_VECTORS']['equal'] = vector;
    this.targetColumn = this.vectorComponent.getTargetColumn();
    config.TARGET_COLUMN = this.targetColumn;
    //config.REMOTE_TARGET = this.targetColumn;
    console.log("Target column: " + this.targetColumn);
    console.log("Created Configure Sangreea:");
    console.log(config['GEN_WEIGHT_VECTORS']['equal']);

    this.sangreea = new $A.algorithms.Sangreea("testus", config);
    this.sangreeaNonIml = new $A.algorithms.Sangreea("testus2", JSON.parse(JSON.stringify(config)));
    for (let genHierarchy of this.getGenHierarchies()) {
      let jsonx: string = JSON.stringify(genHierarchy);
      let strgh = new $A.genHierarchy.Category(jsonx);
      let strgh2 = new $A.genHierarchy.Category(jsonx);
      this.sangreea.setCatHierarchy(strgh._name, strgh);
      this.sangreeaNonIml.setCatHierarchy(strgh2._name, strgh2);
    }

    /*
    this.sangreeaNonIml.getConfig().K_FACTOR = HomeComponent.STOP_AT_K;
    this.sangreeaNonIml.instantiateGraph(this.csvLines, false);
    this.sangreeaNonIml.anonymizeGraph();
    */

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
    console.log("CREATED VECTOR:");
    console.log(v);

    this.configureSangreea(v);
    this.configModal.hide();

    this.userQueryCounter = 0;
    this.isInteractive = true;

    this.interactive.configure(this.sangreea, this.adults, this.progressValue, this.targetColumn);
  }

  onInteractiveOk() {
    this.userQueryCounter++;
    this.progressValue = this.progressValue +
      (100 / (HomeComponent.USER_QUERIES_PER_K * (HomeComponent.STOP_AT_K - 2)));
      console.log(this.sangreea.getConfig()['GEN_WEIGHT_VECTORS']['equal']['categorical']);
      console.log(this.sangreea.getConfig()['GEN_WEIGHT_VECTORS']['equal']['range']);

    if (this.userQueryCounter == HomeComponent.USER_QUERIES_PER_K) {
      this.sangreea.getConfig().K_FACTOR++;
      this.userQueryCounter = 0;
      console.log(this.sangreea.getConfig().K_FACTOR);
      this.sangreea.updateCurrentClusters();
      if (this.sangreea.getConfig().K_FACTOR == HomeComponent.STOP_AT_K) {
        this.isInteractive = false;
        this.showResult = true;
        this.sendToServer();
        return;
      }
    }

    this.interactive.configure(this.sangreea, this.adults, this.progressValue, this.targetColumn);
  }

  sendToServer() {
    //debugger;
    //this.sangreeaNonIml.getConfig().K_FACTOR = HomeComponent.STOP_AT_K;
    //this.sangreeaNonIml.instantiateGraph(this.csvLines, false);
    //this.sangreeaNonIml.anonymizeGraph();

    var biasIml: any = VectorHelper.getVectorAsJson(this.sangreea);
    var csvIml: string = this.sangreea.constructAnonymizedCSV();
    var bias: any = VectorHelper.getVectorAsJson(this.sangreea);
    var csv: string = this.sangreea.constructAnonymizedCSV();

    //var bias: any = VectorHelper.getVectorAsJson(this.sangreeaNonIml);
    //var csv: string = this.sangreeaNonIml.constructAnonymizedCSV();


    this.resultService.postToServer('HeinzUndStefan', bias, biasIml,
      csv, csvIml, this.targetColumn).subscribe(
      data => {
        this.resultComponent.isLoading = false;
        this.resultComponent.setResponse(data);
      },
      err => console.log(err),
      () => console.log('Request Completed')
      );
  }

}
