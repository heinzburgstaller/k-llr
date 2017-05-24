import { VectorComponent } from './vector.component';
import { VectorHelper } from './vectorHelper';
import { SaNGreeA, ISaNGreeAConfig } from 'anonymiationjs';
import * as $A from 'anonymiationjs';

describe('Vector Helper Test', () => {
  var vc: VectorComponent = new VectorComponent();
  vc.valueChange(null);
  var v: any = vc.createVector();
  var value: number = v['range']['age'];
  it('Vector is not null', () => expect(v).toBeTruthy());
  it('Feature age is 0.1', () => expect(value).toBe(0.1));

  var config: ISaNGreeAConfig = $A.config.adults;
  config.NR_DRAWS = 500;
  config.K_FACTOR = 2;
  config['GEN_WEIGHT_VECTORS']['equal'] = v;

  var sangreea = new $A.algorithms.Sangreea("testus", config);
  var reducers: Map<string, number> = new Map();
  reducers.set('age', 0.12);
  VectorHelper.reduce(sangreea, reducers, 0.1);

  var value2: number = config['GEN_WEIGHT_VECTORS']['equal']['range']['age'];
  var value3: number = config['GEN_WEIGHT_VECTORS']['equal']['range']['hours-per-week'];
  it('Feature age is 0.09784', () => expect(value2).toBeCloseTo(0.09784, 0.000001));
  it('Feature h/w is 0.10024', () => expect(value3).toBeCloseTo(0.10024, 0.000001));

  var sum: number = 0.0;
  Object.keys(config['GEN_WEIGHT_VECTORS']['equal']['categorical']).forEach((feature) => {
    sum += config['GEN_WEIGHT_VECTORS']['equal']['categorical'][feature];
  });
  Object.keys(config['GEN_WEIGHT_VECTORS']['equal']['range']).forEach((feature) => {
    sum += config['GEN_WEIGHT_VECTORS']['equal']['range'][feature];
  });

  it('Vector sum is 1', () => expect(sum).toBeCloseTo(1.0000, 0.000001));
});
