export class Adult {
  public id:number;
  public age: number;
  public education_num: number;
  public hours_per_week: number;
  public workclass: string;
  public native_country: string;
  public sex: string;
  public race: string;
  public relationship: string;
  public occupation: string;
  public income: string;
  public marital_status: string;
}

export class AdultGen {
  public adult:Adult;
  public age: string;
  public education_num: string;
  public hours_per_week: string;
  public workclass: string;
  public native_country: string;
  public sex: string;
  public race: string;
  public relationship: string;
  public occupation: string;
  public income: string;
  public marital_status: string;
}
