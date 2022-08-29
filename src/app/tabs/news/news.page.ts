import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage{

  spinner = false;
  nflData: any = [];
  noData = false;
  newsLink;
  constructor(private service: ServiceService, private http: HttpClient) {}


  ionViewWillEnter(){
    // this.http.get(this.service.currentNews, null).subscribe((response: any) => {
    // console.log(response);
    // }, (error) => {
    // console.log(error);
    // });
    this.newsLink = this.service.currentNews;
  }

}
