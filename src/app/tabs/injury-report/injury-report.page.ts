import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-injury-report',
  templateUrl: './injury-report.page.html',
  styleUrls: ['./injury-report.page.scss'],
})
export class InjuryReportPage{

  spinner = false;
  constructor() {
    this.loadUrl();
  }

  async loadUrl(){
    this.spinner = true;
    console.log('Spinner is True');
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('Spinner is False');
    this.spinner = false;
  }

}
