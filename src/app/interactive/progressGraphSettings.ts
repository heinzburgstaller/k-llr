import { GaugeSegment, GaugeLabel } from 'ng-gauge';

export class ProgressGraphSettings {

  public static colors: any = {
      indigo: '#14143e',
      pink: '#fd1c49',
      orange: '#ff6e00',
      yellow: '#f0c800',
      mint: '#00efab',
      cyan: '#05d1ff',
      purple: '#841386',
      white: '#fff'
    };

  public static defaultSetting: any = {
    bgRadius: 60,
    bgColor: ProgressGraphSettings.colors.indigo,
    rounded: true,
    reverse: false,
    animationSecs: 1,
    labels: [
      new GaugeLabel({
        color: ProgressGraphSettings.colors.white,
        text: 'Cost',
        x: 0,
        y: 20,
        fontSize: '1em'
      }),
      new GaugeLabel({
        color: ProgressGraphSettings.colors.pink,
        text: 'N/A',
        x: 0,
        y: 0,
        fontSize: '2em'
      })
    ],
    segments: [
      new GaugeSegment({
        value: 0,
        color: ProgressGraphSettings.colors.pink,
        borderWidth: 20
      })
    ]
  };
}
