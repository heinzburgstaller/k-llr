import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vector',
  templateUrl: './vector.component.html',
  styleUrls: ['./vector.component.css']
})
export class VectorComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    this.valueChange(0);
  }

  valueChange(newValue) {
    var sum: number = this.valueAge + this.valueEducation + this.valueWorkTime
      + this.valueCountry + this.valueSex + this.valueRelationship + this.valueOccupation
      + this.valueIncome + this.valueRace + this.valueMarital;
    this.adjustedAge = this.valueAge / sum;
    this.adjustedEducation = this.valueEducation / sum;
    this.adjustedWorkTime = this.valueWorkTime / sum;
    this.adjustedCountry = this.valueCountry / sum;
    this.adjustedSex = this.valueSex / sum;
    this.adjustedRelationship = this.valueRelationship/ sum;
    this.adjustedOccupation = this.valueOccupation / sum;
    this.adjustedIncome = this.valueIncome / sum;
    this.adjustedRace = this.valueRace / sum;
    this.adjustedMarital = this.valueMarital / sum;
  }

}
