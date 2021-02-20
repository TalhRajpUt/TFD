import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  spinner = false;
  constructor() {
    this.loadUrl();
  }

  async loadUrl(){
    this.spinner = true;
    console.log('Spinner is True');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Spinner is False');
    this.spinner = false;
  }
}
