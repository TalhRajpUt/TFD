import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  customText = 'On';
  constructor() { }

  ngOnInit() {
  }


  // this.fcm.subscribeToTopic('marketing');
  // this.fcm.clearAllNotifications();

  // this.fcm.unsubscribeFromTopic('marketing');

}