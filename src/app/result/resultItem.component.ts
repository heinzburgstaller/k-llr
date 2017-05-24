import { Component, Input } from '@angular/core';

@Component({
  selector: 'result-item',
  template: `
    <div class="thumbnail">
      <img src="http://placehold.it/800x500" alt="">
      <div class="caption">
          <h4>Feature Label {{item}}</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <p>
              <a href="#" class="btn btn-primary">Details</a>
              <a href="#" class="btn btn-default">Print</a>
          </p>
      </div>
    </div>
   `
})
export class ResultItem {

  @Input() item: any;

  constructor() {
  }

}
