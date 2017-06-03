import {Component} from '@angular/core';

@Component({
  selector: 'fountain-app',
  template: require('./hello.html')
})
export class HelloComponent {
  public hello: string;
  public test = 'whatup';

  constructor() {
    this.hello = 'Hello World!';
  }
}
