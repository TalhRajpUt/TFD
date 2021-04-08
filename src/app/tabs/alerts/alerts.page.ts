import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';
import { Platform } from '@ionic/angular';
import { ServiceService } from './../../service/service.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {

  notifications: any = [];
  constructor(private service: ServiceService, private platform: Platform, private http: HttpClient,
              private fcm: FCM) { }

  ngOnInit() { }

  ionViewDidEnter(){
    this.fetchNotifications();
  }

  fetchNotifications(){
    this.http.post(this.service.baseUrl + 'notifications', {}).subscribe(async (response) => {
      this.notifications = response;
      if (this.notifications.error === false){
        this.notifications = this.notifications.notifications.reverse();
        console.log(this.notifications);
      }
    }, (error) => {
      console.log(error);
      return false;
    });
  }

}

