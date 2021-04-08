// import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ServiceService } from './../../service/service.service';
import { Storage } from '@ionic/storage';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  customText = 'On';
  notificationSetting: any = [];
  constructor(private fcm: FCM, private storage: Storage, private service: ServiceService,
              private router: Router, private iab: InAppBrowser) { }

  ngOnInit() {
  }

  async logOut(){
    await this.storage.clear();
    await this.disableNotifications();
    // this.twitter.logout().then((response) => {
    //   console.log('LogOut', response);
    // }, (error) => {
    //   console.log(error);
    // });
    // tslint:disable-next-line:no-string-literal
    navigator['app'].exitApp();
  }

  async disableNotifications(){
    await this.fcm.unsubscribeFromTopic('ALL');
    await this.fcm.unsubscribeFromTopic('NBA');
    await this.fcm.unsubscribeFromTopic('MLB');
    await this.fcm.unsubscribeFromTopic('NFL');
    await this.fcm.unsubscribeFromTopic('NHL');
  }

  async mlbAlerts(value){
    console.log(value.detail);
    if (value.detail.checked === false){
      this.fcm.unsubscribeFromTopic('MLB');
      // this.service.presentToast('MLB Alerts are Disabled', 'top', 2000, 'warning');
    }else{
      this.fcm.subscribeToTopic('MLB');
      // this.service.presentToast('MLB Alerts are Enabled', 'top', 2000, 'success');
    }
    this.notificationSetting.MLB = value.detail.checked;
    await this.storage.set('notification', this.notificationSetting).then((response) => {
      console.log(response);
    });
  }

  async nbaAlerts(value){
    console.log(value.detail);
    if (value.detail.checked === false){
      this.fcm.unsubscribeFromTopic('NBA');
      // this.service.presentToast('NBA Alerts are disabled', 'top', 2000, 'warning');
    }else{
      this.fcm.subscribeToTopic('NBA');
      // this.service.presentToast('NBA Alerts are Enabled', 'top', 2000, 'success');
    }
    this.notificationSetting.NBA = value.detail.checked;
    await this.storage.set('notification', this.notificationSetting).then((response) => {
      console.log(response);
    });
  }

  async nflAlerts(value){
    console.log(value.detail);
    if (value.detail.checked === false){
      this.fcm.unsubscribeFromTopic('NFL');
      // this.service.presentToast('NFL Alerts are disabled', 'top', 2000, 'warning');
    }else{
      this.fcm.subscribeToTopic('NFL');
      // this.service.presentToast('NFL Alerts are Enabled', 'top', 2000, 'success');
    }
    this.notificationSetting.NFL = value.detail.checked;
    await this.storage.set('notification', this.notificationSetting).then((response) => {
      console.log(response);
    });
  }

  async nhlAlerts(value){
    console.log(value.detail);
    if (value.detail.checked === false){
      this.fcm.unsubscribeFromTopic('NHL');
      // this.service.presentToast('NHL Alerts are disabled', 'top', 2000, 'warning');
    }else{
      this.fcm.subscribeToTopic('NHL');
      // this.service.presentToast('NHL Alerts are Enabled', 'top', 2000, 'success');
    }
    this.notificationSetting.NHL = value.detail.checked;
    await this.storage.set('notification', this.notificationSetting).then((response) => {
      console.log(response);
    });
  }

  async allNotifications(value){
    console.log(value.detail);
    if (value.detail.checked === false){
      this.fcm.unsubscribeFromTopic('ALL');
      // this.service.presentToast('Alerts are disabled', 'top', 2000, 'warning');
    }else{
      this.fcm.subscribeToTopic('ALL');
      // this.service.presentToast('Alerts are Enabled', 'top', 2000, 'success');
    }
    this.notificationSetting.ALL = value.detail.checked;
    await this.storage.set('notification', this.notificationSetting).then((response) => {
      console.log(response);
    });
  }

  async ionViewDidEnter(){
    await this.storage.get('notification').then((response) => {
      if (response === null || response === ''){
        this.notificationSetting = {
          MLB: true,
          NBA: true,
          NHL: true,
          NFL: true,
          ALL: true
        };
      }else{
        this.notificationSetting = response;
        console.log(response);
      }
    });
  }

  changePassword(){
    this.service.segment = 'Update';
    this.router.navigateByUrl('/forget');
  }

  openLink(url): void{
    this.iab.create(url, '_blank', {hideurlbar: 'no', fullscreen: 'no', hidespinner: 'no',
      hidenavigationbuttons: 'yes', zoom: 'no', location: 'no', clearcache: 'yes', toolbar: 'yes', closebuttoncaption: 'Close'});
  }
}
