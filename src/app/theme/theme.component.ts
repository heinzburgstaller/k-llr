import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  constructor(private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  private onDrag(args) {
    let [e, el] = args;
    console.log(e + ', ' + el);
  }

  private onDrop(args) {
    let [e, el] = args;
    console.log(e + ', ' + el);
  }

  private onOver(args) {
    let [e, el, container] = args;
    console.log(e + ', ' + el);
  }

  private onOut(args) {
    let [e, el, container] = args;
    console.log(e + ', ' + el);
  }

  ngOnInit() {
  }

}
