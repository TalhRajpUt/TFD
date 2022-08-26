import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-injury-report',
  templateUrl: './injury-report.page.html',
  styleUrls: ['./injury-report.page.scss'],
})
export class InjuryReportPage{

  spinner = false;
  nflData: any = [];
  noData = false;
  constructor(private service: ServiceService, private http: HttpClient) {
    // this.loadUrl();
  }

  // async loadUrl(){
  //   this.spinner = true;
  //   console.log('Spinner is True');
  //   await new Promise(resolve => setTimeout(resolve, 3000));
  //   console.log('Spinner is False');
  //   this.spinner = false;
  // }

  // ionViewWillEnter(){
  //   this.spinner = true;
  //   this.noData = true;
  //   this.http.get(this.service.reportUrl).subscribe((response) => {
  //     this.nflData = response;
  //     console.log(response);
  //     if (!this.nflData.error){
  //       this.nflData = this.nflData.reports;
  //       this.nflData.forEach(team => {
  //           if (team.reports.length > 0){
  //             console.log('condiction satisfied');
  //             this.noData = false;
  //           }
  //       });
  //       this.spinner = false;
  //     }else{
  //       this.spinner = false;
  //       this.service.presentToast('Something went wrong', 'bottom', 2000, 'danger');
  //     }
  //   }, (error) => {
  //     this.spinner = false;
  //     console.log(error);
  //     this.service.presentToast(error.message, 'bottom', 2000, 'danger');
  //   });
  // }

}
