import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Adult, AdultGen } from '../adult';
import { SaNGreeA } from 'anonymizationjs';
import { ProgressGraphSettings } from './progressGraphSettings';
import {VectorHelper} from '../vector/vectorHelper';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {

  private sangreea: SaNGreeA;
  private adults: Array<Adult> = [];
  private progressValue: number = 0;
  private autoNext: boolean = false;
  private targetColumn: string;

  public option1Rows: Array<AdultGen> = [];
  public option2Rows: Array<AdultGen> = [];
  public decideRows: Array<Adult> = [];
  public decideBaseNode: Array<Adult> = [];
  public decidedRows1: Array<AdultGen> = [];
  public decidedRows2: Array<AdultGen> = [];
  private oldCosts: number = 0;

  public progressGraph1: any = ProgressGraphSettings.defaultSetting;
  private option1Cluster: any;
  private option2Cluster: any;
  private option1Costs: number;
  private option2Costs: number;
  private option1selected: boolean = false;

  private colorAge: any;
  private colorEducation: any;
  private colorHours: any;
  private colorCountry: any;
  private colorSex: any;
  private colorRelation: any;
  private colorOccupation: any;
  private colorIncome: any;
  private colorRace: any;
  private colorMartial: any;
  private colorWorkclass: any;

  public weightValues: Map<string, number>;
  private clusterChoosen: boolean;

  private colorList: Array<String> = ["bg-success", "bg-warning", "bg-warning", "bg-danger"];

  @Output() onOk = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public configure(s: SaNGreeA, a: Array<Adult>, progressValue: number, targetColumn: string): void {
    this.sangreea = s;
    this.adults = a;
    this.decidedRows1 = [];
    this.decidedRows2 = [];
    this.progressValue = progressValue;
    this.targetColumn = targetColumn;

    this.anon();
  }

  private anon(): void {
    this.option1Cluster = this.selectRandomCluster(this.sangreea._clusters);

    this.option1Rows = this.getAdultGensFromCluster(this.option1Cluster);
    this.option2Cluster = this.selectRandomCluster(this.sangreea._clusters);
    this.option2Rows = this.getAdultGensFromCluster(this.option2Cluster);
    let nodeId = this.sangreea.acquireUnaddedNodeId();
    this.decideRows = [this.adults[nodeId]];
    this.decideBaseNode = this.decideRows;

    this.option1Costs = this.sangreea.calculateGIL(this.option1Cluster,
      this.sangreea._graph.getNodeById(this.decideRows[0].id));

    this.option2Costs = this.sangreea.calculateGIL(this.option2Cluster,
      this.sangreea._graph.getNodeById(this.decideRows[0].id));
  }

  private selectRandomCluster(clusters) {
    return clusters[Math.floor(Math.random() * clusters.length)];
  }

  private getAdultGensFromCluster(cluster): Array<AdultGen> {
    var adultGens: Array<AdultGen> = [];

    for (let key in cluster.nodes) {
      let ag: AdultGen = new AdultGen();
      ag.adult = this.adults[cluster.nodes[key]['_id']];
      ag.income = cluster.gen_feat['income'];
      ag.marital_status = cluster.gen_feat['marital-status'];
      ag.education_num = cluster.gen_feat['education-num'];
      ag.native_country = cluster.gen_feat['native-country'];
      ag.occupation = cluster.gen_feat['occupation'];
      ag.race = cluster.gen_feat['race'];
      ag.sex = cluster.gen_feat['sex'];
      ag.workclass = cluster.gen_feat['workclass'];

      ag.relationship = cluster.gen_feat['relationship'];

      if (cluster.gen_ranges.age[0] == cluster.gen_ranges.age[1]) {
        ag.age = cluster.gen_ranges.age[0];
      } else {
        ag.age = cluster.gen_ranges.age[0] + ' - ' + cluster.gen_ranges.age[1];
      }
      if (cluster.gen_ranges['hours-per-week'][0] == cluster.gen_ranges['hours-per-week'][1]) {
        ag.hours_per_week = cluster.gen_ranges['hours-per-week'][0];
      } else {
        ag.hours_per_week = cluster.gen_ranges['hours-per-week'][0]
          + ' - ' + cluster.gen_ranges['hours-per-week'][1];
      }
      if (this.targetColumn != 'education-num') {
        if (cluster.gen_ranges['education-num'][0] == cluster.gen_ranges['education-num'][1]) {
          ag.education_num = cluster.gen_ranges['education-num'][0];
        } else {
          ag.education_num = cluster.gen_ranges['education-num'][0]
            + ' - ' + cluster.gen_ranges['education-num'][1];
        }
      }
      adultGens.push(ag);
    }

    return adultGens;
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
    this.setGauge(Math.round(this.option1Costs * 100));
  }

  public dragOverOption2(event: any) {
    this.setGauge(Math.round(this.option2Costs * 100));
  }

  private copyAdultGen(Cl: any, from: AdultGen): AdultGen {
    var ag: AdultGen = new AdultGen();
    ag.age = from.age;
    ag.marital_status = from.marital_status;
    return ag;
  }

  public dragDropOption1(event: any) {
    if (this.decidedRows1.length <= this.decidedRows2.length) {

      var copyCluster = JSON.parse(JSON.stringify(this.option1Cluster));

      this.calcNewCluster(copyCluster, this.decideBaseNode);

      var rows = this.getAdultGensFromCluster(copyCluster);
      this.decideRows = [];
      this.decidedRows1.push(rows[this.option1Rows.length - 1]);
      this.decidedRows2 = [];

      this.option1selected = true;
      this.updateColors(this.option1Cluster, this.decideBaseNode);

      if (this.autoNext) {
        this.ok();
      }
    }
  }

  public dragDropOption2(event: any) {
    if (this.decidedRows2.length <= this.decidedRows1.length) {

      var copyCluster = JSON.parse(JSON.stringify(this.option2Cluster));

      this.calcNewCluster(copyCluster, this.decideBaseNode);
      var rows = this.getAdultGensFromCluster(copyCluster);
      this.decideRows = [];
      this.decidedRows2.push(rows[this.option2Rows.length - 1]);
      this.decidedRows1 = [];


      this.option1selected = false;
      this.updateColors(this.option2Cluster, this.decideBaseNode);

      if (this.autoNext) {
        this.ok();
      }
    }
  }

  /*  private createWeightMap() {
      if (this.targetColumn == 'education-num') {
        this.weightValues = new Map<string,number>(["age",1]);
        /*, 'hours-per-week', 'native-country', 'sex', 'relationship', 'occupation', 'income', 'race', 'marital-status', 'workclass');

        }
      if (this.targetColumn == 'income') {

      }
      if (this.targetColumn == 'marital-status') {

      }
    }*/

  private updateColors(Cl: any, decideBaseNode: Array<Adult>): void {

    this.weightValues = new Map();


    var age_cost = this.compareRange(Cl.gen_ranges.age, decideBaseNode[0]['age']);
    console.log("Age: ");
    console.log(age_cost);
    var percentCorrection = 10;

    this.colorAge = this.colorList[age_cost[0]];
    this.weightValues.set('age', age_cost[0] / percentCorrection);

    if (this.targetColumn != 'education-num') {
      var education_cost = this.compareRange(Cl.gen_ranges.education, decideBaseNode[0]['education']);
      this.colorEducation = this.colorList[education_cost[0]];
      this.weightValues.set('education-num', education_cost[0] / percentCorrection);
    }

    var hours_cost = this.compareRange(Cl.gen_ranges['hours-per-week'], decideBaseNode[0]['hours_per_week']);
    this.colorHours = this.colorList[hours_cost[0]];
    this.weightValues.set('hours-per-week', hours_cost[0] / percentCorrection);

    var country_cost = this.compareHierachy(Cl, decideBaseNode, 'native-country');
    this.colorCountry = this.colorList[country_cost[0]];
    this.weightValues.set('native-country', country_cost[0] / percentCorrection);
    var sex_cost = this.compareHierachy(Cl, decideBaseNode, 'sex')
    this.colorSex = this.colorList[sex_cost[0]];
    this.weightValues.set('sex', sex_cost[0] / percentCorrection);
    var relation_cost = this.compareHierachy(Cl, decideBaseNode, 'relationship');
    this.colorRelation = this.colorList[relation_cost[0]];
    this.weightValues.set('relationship', relation_cost[0] / percentCorrection);
    var occupation_cost = this.compareHierachy(Cl, decideBaseNode, 'occupation');
    this.colorOccupation = this.colorList[occupation_cost[0]];
    this.weightValues.set('occupation', occupation_cost[0] / percentCorrection);
    if (this.targetColumn != 'income') {
      var income_cost = this.compareHierachy(Cl, decideBaseNode, 'income');
      this.colorIncome = this.colorList[income_cost[0]];
      this.weightValues.set('income', income_cost[0] / percentCorrection);
    }

    var race_cost = this.compareHierachy(Cl, decideBaseNode, 'race');
    this.colorRace = this.colorList[race_cost[0]];
    this.weightValues.set('race', race_cost[0] / percentCorrection);
    if (this.targetColumn != 'marital-status') {
      var martial_cost = this.compareHierachy(Cl, decideBaseNode, 'marital-status');
      this.colorMartial = this.colorList[martial_cost[0]];
      this.weightValues.set('marital-status', martial_cost[0] / percentCorrection);
    }

    var workclass_cost = this.compareHierachy(Cl, decideBaseNode, 'workclass')
    this.colorWorkclass = this.colorList[workclass_cost[0]];
    this.weightValues.set('workclass', workclass_cost[1]);
    this.clusterChoosen = true;


  }

  private compareRange(range: Array<number>, value: number): Array<number> {
    if (range == null)
      return [0, 0];

    var relative_costs = 0;

    if (value > range[1]) {
      relative_costs = value / range[1];
      if (value < range[1] * 1.1)
        return [0, relative_costs];
      if (value < range[1] * 1.2)
        return [1, relative_costs];
      if (value < range[1] * 1.3)
        return [2, relative_costs];
      return [3, relative_costs];
    }
    if (value < range[0]) {
      relative_costs = range[0] / value;
      if (value > range[0] * 0.9)
        return [0, relative_costs];
      if (value > range[0] * 0.8)
        return [1, relative_costs];
      if (value > range[0] * 0.7)
        return [2, relative_costs];
      return [3, relative_costs];
    }

    return [0, relative_costs];
  }

  private compareHierachy(Cl: any, decideBaseNode: Array<Adult>, feature: any): Array<number> {

    var cat_gh = this.sangreea.getCatHierarchy(feature);
    var Cl_feat = Cl.gen_feat[feature];
    var Y_feat = decideBaseNode[0][feature];
    if (feature == "marital-status" && Y_feat == null)
      Y_feat = decideBaseNode[0]['marital_status'];

    var Cl_level = cat_gh.getLevelEntry(Cl_feat);
    var Y_level = cat_gh.getLevelEntry(Y_feat);
    var old_level = Cl_level;
    if (Cl_level == null || Y_level == null)
      return [0, 0];

    while (Cl_feat !== Y_feat) {
      Y_feat = cat_gh.getGeneralizationOf(Y_feat);
      Y_level = cat_gh.getLevelEntry(Y_feat);
      if (Cl_level > Y_level) {
        Cl_feat = cat_gh.getGeneralizationOf(Cl_feat);
        Cl_level = cat_gh.getLevelEntry(Cl_feat);
      }
    }

    var level_difference = old_level - Cl_level;
    var relative_level_change = level_difference / cat_gh._nr_levels;

    if (relative_level_change == 0)
      return [0, relative_level_change];
    if (relative_level_change < 0.33)
      return [1, relative_level_change];
    if (relative_level_change < 0.66)
      return [2, relative_level_change];
    return [3, relative_level_change];
  }

  private calcNewCluster(Cl: any, decideBaseNode: Array<Adult>): void {
    Cl.nodes[decideBaseNode[0].id] = this.sangreea._graph.getNodeById(decideBaseNode[0].id);
    this.sangreea.updateLevels(Cl, this.sangreea._graph.getNodeById(decideBaseNode[0].id));

    Object.keys(this.sangreea._cont_hierarchies).forEach((range) => {
      Cl.gen_ranges[range] = this.sangreea.expandRange(Cl.gen_ranges[range],
        this.sangreea._graph.getNodeById(decideBaseNode[0].id).getFeature(range));
    });
  }

  private calcNewClusterInSangreea(Cl: any, decideBaseNode: Array<Adult>): void {
    for (var i in this.sangreea._clusters) {
      if (Cl == this.sangreea._clusters[i]) {
        this.sangreea._clusters[i].nodes[decideBaseNode[0].id] = this.sangreea._graph.getNodeById(decideBaseNode[0].id);
        this.sangreea.updateLevels(this.sangreea._clusters[i], this.sangreea._graph.getNodeById(decideBaseNode[0].id));

        Object.keys(this.sangreea._cont_hierarchies).forEach((range) => {
          this.sangreea._clusters[i].gen_ranges[range] = this.sangreea.expandRange(this.sangreea._clusters[i].gen_ranges[range],
            this.sangreea._graph.getNodeById(decideBaseNode[0].id).getFeature(range));
        });
        break;
      }
    }
  }

  public ok(): void {
    if (this.clusterChoosen)
      VectorHelper.reduce(this.sangreea, this.weightValues, this.progressValue);
    this.clusterChoosen = false;
    console.log("New Weights:");
    console.log(this.sangreea.getConfig()['GEN_WEIGHT_VECTORS']['equal']);
    if (this.option1selected) {
      this.calcNewClusterInSangreea(this.option1Cluster, this.decideBaseNode);
    } else {
      this.calcNewClusterInSangreea(this.option2Cluster, this.decideBaseNode);
    }
    this.onOk.emit();
  }

}
