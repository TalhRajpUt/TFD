import { Platform } from '@ionic/angular';
import { ServiceService } from './../../service/service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {

  notifications: any = [];
  constructor(private service: ServiceService, private platform: Platform) {
    this.platform.ready().then(() => {
      this.notifications = this.service.notifications;
      console.log(this.notifications);
      this.notifications = this.notifications.reverse();
    });
  }

  ngOnInit() { }

  ionViewDidEnter(){
    this.loadNotifications();
  }

  loadNotifications(){
    this.notifications = this.service.notifications;
    this.notifications = this.notifications.reverse();
  }

}

