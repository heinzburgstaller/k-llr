import { SaNGreeA } from 'anonymizationjs';

export class VectorHelper {

  public static readonly FEATURES:number = 10;
  public static readonly COMMON_REDUCE_MARGIN:number = 0.1;

  public static getVectorAsJson(sangreea: SaNGreeA): any {
    var vaj: any = {};
    var v = sangreea.getConfig()['GEN_WEIGHT_VECTORS']['equal'];

    Object.keys(v['categorical']).forEach((feature) => {
      vaj[feature] = v['categorical'][feature];
    });

    Object.keys(v['range']).forEach((feature) => {
      vaj[feature] = v['range'][feature];
    });

    return vaj;
  }

  public static reduce(sangreea: SaNGreeA, reducers: Map<string, number>, progress: number): void {

    var percentSum = 0;
    reducers.forEach((value: number, key: string) => {
      percentSum += value;
    });
    reducers.forEach((value: number, key: string) => {
      reducers[key] = value / percentSum;
    });

    var v = sangreea.getConfig()['GEN_WEIGHT_VECTORS']['equal'];
    var sumall = 0;
    var progressReduceMargin = (1.0 - progress) * VectorHelper.COMMON_REDUCE_MARGIN;
    Object.keys(v['categorical']).forEach((feature) => {
      v['categorical'][feature] = v['categorical'][feature] + progressReduceMargin / VectorHelper.FEATURES;
      v['categorical'][feature] = v['categorical'][feature] - progressReduceMargin * reducers.get(feature)/percentSum;
      sumall += v['categorical'][feature];
    });
    Object.keys(v['range']).forEach((feature) => {
      v['range'][feature] = v['range'][feature] + progressReduceMargin / VectorHelper.FEATURES;
      v['range'][feature] = v['range'][feature] - progressReduceMargin * reducers.get(feature)/ percentSum;
      sumall += v['range'][feature];
    });
    console.log(sumall);
  }

}
