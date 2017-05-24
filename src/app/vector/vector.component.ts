import { Component, OnInit } from '@angular/core';
import { VectorHelper } from './vectorHelper';

@Component({
  selector: 'app-vector',
  templateUrl: './vector.component.html',
  styleUrls: ['./vector.component.css']
})
export class VectorComponent implements OnInit {

  public radioModel: string = 'edu';

  public valueAge: number = 50;
  public valueEducation: number = 50;
  public valueWorkTime: number = 50;
  public valueCountry: number = 50;
  public valueSex: number = 50;
  public valueRelationship: number = 50;
  public valueWorkclass: number = 50;
  public valueOccupation: number = 50;
  public valueIncome: number = 50;
  public valueRace: number = 50;
  public valueMarital: number = 50;

  public adjustedAge: number = 50;
  public adjustedEducation: number = 50;
  public adjustedWorkTime: number = 50;
  public adjustedCountry: number = 50;
  public adjustedSex: number = 50;
  public adjustedRelationship: number = 50;
  public adjustedOccupation: number = 50;
  public adjustedIncome: number = 50;
  public adjustedRace: number = 50;
  public adjustedMarital: number = 50;
  public adjustedWorkclass: number = 50;

  constructor() { }

  ngOnInit() {
    this.valueChange(0);
  }

  public getTargetColumn():string {
    if (this.radioModel == 'marital') {
      return 'marital-status';
    }

    if (this.radioModel == 'income') {
      return 'income';
    }

    return 'education-num';
  }

  valueChange(newValue) {
    var sum: number = this.valueAge + this.valueEducation + this.valueWorkTime
      + this.valueCountry + this.valueSex + this.valueRelationship + this.valueOccupation
      + this.valueIncome + this.valueRace + this.valueMarital + this.valueWorkclass;

    if (this.radioModel == 'edu') {
      sum = sum - this.valueEducation;
    }

    if (this.radioModel == 'marital') {
      sum = sum - this.valueMarital;
    }

    if (this.radioModel == 'income') {
      sum = sum - this.valueIncome;
    }

    this.adjustedAge = this.valueAge / sum;
    this.adjustedEducation = this.valueEducation / sum;
    this.adjustedWorkTime = this.valueWorkTime / sum;
    this.adjustedCountry = this.valueCountry / sum;
    this.adjustedSex = this.valueSex / sum;
    this.adjustedRelationship = this.valueRelationship / sum;
    this.adjustedOccupation = this.valueOccupation / sum;
    this.adjustedIncome = this.valueIncome / sum;
    this.adjustedRace = this.valueRace / sum;
    this.adjustedMarital = this.valueMarital / sum;
    this.adjustedWorkclass = this.valueWorkclass / sum;
  }

  public createVector(): any {
    var v: any = {}
    v['categorical'] = {};
    if (this.radioModel != 'income') {
      console.log("CREATE INCOME");
      v['categorical']['income'] = this.adjustedIncome;
    }
    v['categorical']['native-country'] = this.adjustedCountry;
    v['categorical']['sex'] = this.adjustedSex;
    v['categorical']['relationship'] = this.adjustedRelationship;
    v['categorical']['workclass'] = this.adjustedWorkclass;
    v['categorical']['race'] = this.adjustedRace;
    v['categorical']['occupation'] = this.adjustedOccupation;
    if (this.radioModel != 'marital') {
      console.log("CREATE MARITAL");
      v['categorical']['marital-status'] = this.adjustedMarital;
    }

    v['range'] = {};
    v['range']['age'] = this.adjustedAge;
    v['range']['hours-per-week'] = this.adjustedWorkTime;
    if (this.radioModel != 'edu') {
      console.log("CREATE EDUCATION");
      v['range']['education-num'] = this.adjustedEducation;
    }

    return v;
  }

}
