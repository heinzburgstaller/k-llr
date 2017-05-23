import { SaNGreeA } from 'anonymiationjs';

export class VectorHelper {

  public static readonly FEATURES:number = 10;
  public static readonly COMMON_REDUCE_MARGIN:number = 0.2;

  public static reduce(sangreea: SaNGreeA, reducers: Map<string, number>, progress: number): void {
    var v = sangreea.getConfig()['GEN_WEIGHT_VECTORS']['equal'];
    var reduceSum = 0;
    reducers.forEach((value: number, key: string) => {
      reduceSum += value;
    });

    var progressReduceMargin = (1.0 - progress) * VectorHelper.COMMON_REDUCE_MARGIN;
    var addToOthers = reduceSum / (VectorHelper.FEATURES - reducers.size);

    var increase: (feature, ref: any) => void = function(feature, ref: any) {
      if (reducers.has(feature)) {
        return;
      }
      ref[feature] += addToOthers;
    };
    Object.keys(v['categorical']).forEach((feature) => {
      increase(feature, v['categorical']);
    });
    Object.keys(v['range']).forEach((feature) => {
      increase(feature, v['range']);
    });
  }

}