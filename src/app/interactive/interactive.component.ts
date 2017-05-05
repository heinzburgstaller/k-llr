import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Adult, AdultGen } from '../adult';
import { SaNGreeA } from 'anonymiationjs';
import { ProgressGraphSettings } from './progressGraphSettings';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {

  private sangreea: SaNGreeA;
  private adults: Array<Adult> = [];

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

  @Output() onOk = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public configure(s: SaNGreeA, a: Array<Adult>): void {
    this.sangreea = s;
    this.adults = a;
    this.anon();
  }

  private anon(): void {
    this.option1Cluster = this.selectRandomCluster(this.sangreea._clusters);
    console.log(this.option1Cluster);

    this.option1Rows = this.getAdultGensFromCluster(this.option1Cluster);
    this.option2Cluster = this.selectRandomCluster(this.sangreea._clusters);
    this.option2Rows = this.getAdultGensFromCluster(this.option2Cluster);
    let nodeId = this.sangreea.acquireUnaddedNodeId();
    this.decideRows = [this.adults[nodeId]];
    this.decideBaseNode = this.decideRows;

    this.option1Costs = this.sangreea.calculateGIL(this.option1Cluster,
      this.sangreea._graph.getNodeById(this.decideRows[0].id));
    console.log(this.sangreea._graph.getNodeById(this.decideRows[0].id));
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
      ag.income = cluster.gen_feat.income;
      ag.marital_status = cluster.gen_feat['marital-status'];
      ag.native_country = cluster.gen_feat['native-country'];
      ag.occupation = cluster.gen_feat['occupation'];
      ag.race = cluster.gen_feat['race'];
      ag.sex = cluster.gen_feat['sex'];
      ag.workclass = cluster.gen_feat['workclass'];
      ag.relationship = cluster.gen_feat['relationship'];
      console.log(cluster.gen_ranges);
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
    var copyCluster = JSON.parse(JSON.stringify(this.option1Cluster));

    this.calcNewCluster(copyCluster, this.decideBaseNode);
    console.log(copyCluster);
    var rows = this.getAdultGensFromCluster(copyCluster);
    this.decideRows = [];
    this.decidedRows1.push(rows[this.option1Rows.length - 1]);
    this.decidedRows2 = [];

    this.option1selected = true;
  }

  public dragDropOption2(event: any) {
    var copyCluster = JSON.parse(JSON.stringify(this.option2Cluster));

    this.calcNewCluster(copyCluster, this.decideBaseNode);
    var rows = this.getAdultGensFromCluster(copyCluster);
    this.decideRows = [];
    this.decidedRows2.push(rows[this.option2Rows.length - 1]);
    this.decidedRows1 = [];

    this.option1selected = false;
  }

  private calcNewCluster(Cl: any, decideBaseNode: Array<Adult>): void {

    Cl.nodes[decideBaseNode[0].id] = this.sangreea._graph.getNodeById(decideBaseNode[0].id);
    console.log("UUUUUUUUU");
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
        console.log("UUUUUUUUU");
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
    if (this.option1selected) {
      this.calcNewClusterInSangreea(this.option1Cluster, this.decideBaseNode);
    } else {
      this.calcNewClusterInSangreea(this.option2Cluster, this.decideBaseNode);
    }
    this.onOk.emit();
  }

}
