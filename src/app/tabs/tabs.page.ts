import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/service/service.service';
import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  selectedTab = 'Home';
  news: any = [];
  marqueeNews = '';
  constructor(private navCtrl: NavController, private http: HttpClient, private service: ServiceService) { }


  ionViewWillEnter() {
    this.fetchNotifications();
  }
  tabUpdated(tab) {
    this.selectedTab = tab;
  }

  openAlerts() {
    console.log('Marquee Clicked');
    this.navCtrl.navigateForward('/alerts');
  }

  fetchNotifications() {
    this.http.post(this.service.baseUrl + 'notifications', null).subscribe(async (response: any) => {
      console.log(response);
      if (!response.error) {
        this.news = response.notifications;
        this.news = this.news.reverse();
        await this.news.forEach(news => {
          this.marqueeNews += news.title + ': ' + news.body + ' | ';
        });
      }
    }, (error) => {
      console.log(error);
    });
  }
}
