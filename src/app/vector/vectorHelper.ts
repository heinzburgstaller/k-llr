import { SaNGreeA } from 'anonymizationjs';

export class VectorHelper {

  public static readonly FEATURES:number = 10;
  public static readonly COMMON_REDUCE_MARGIN:number = 0.3;

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

    var v = sangreea.getConfig()['GEN_WEIGHT_VECTORS']['equal'];
    var sumall = 0;
    var progressReduceMargin = (1.0 - progress / 100) * VectorHelper.COMMON_REDUCE_MARGIN;

    Object.keys(v['categorical']).forEach((feature) => {
      v['categorical'][feature] = v['categorical'][feature] + progressReduceMargin / VectorHelper.FEATURES;
      sumall += v['categorical'][feature];
    });
    Object.keys(v['range']).forEach((feature) => {
      v['range'][feature] = v['range'][feature] + progressReduceMargin / VectorHelper.FEATURES;
      sumall += v['range'][feature];
    });

    var sumallnew = 0;
    Object.keys(v['categorical']).forEach((feature) => {
      v['categorical'][feature] = v['categorical'][feature] / sumall;
      sumallnew += v['categorical'][feature];
    });
    Object.keys(v['range']).forEach((feature) => {
      v['range'][feature] = v['range'][feature] / sumall;
      sumallnew += v['range'][feature];
    });


  }

}
