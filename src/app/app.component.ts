import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  notifications: any = [];
  constructor(public navCtrl: NavController,
              private platform: Platform,
              private fcm: FCM,
              // private router: Router
              private storage: Storage,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar) {
    this.initializeApp();
  }

  async validateLogin(){
    await this.storage.get('user').then((response) => {
      if (response === null || response === ''){
        this.navCtrl.navigateRoot('/login');
      }else{
        this.navCtrl.navigateRoot('/tabs');
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#14171A');
      this.statusBar.overlaysWebView(false);
      this.statusBar.show();
      this.splashScreen.hide();
      this.fcmNotification();
      this.validateLogin();
    });
  }

  fcmNotification(){
    console.log('Procedding with FCM');
    this.fcm.getToken().then(token => {
      console.log(token);
      this.storage.set('token', token).then();

    });

    this.fcm.onNotification().subscribe(data => {
      this.storage.get('notifications').then((previousNotifications) => {
        if (previousNotifications === undefined || previousNotifications === null || previousNotifications === ''){
          this.notifications = [];
        }else{
          this.notifications = previousNotifications;
        }
      });
      this.notifications = this.notifications.concat(data);
      this.storage.set('notifications', this.notifications).then(notifications => {
        console.log('Notification Data', notifications);
      });
      if (data.wasTapped){
        console.log(this.notifications);
        this.validateLogin();
      } else {
        console.log('Received in foreground');
      }
    });

    this.fcm.hasPermission().then(hasPermission => {
      if (hasPermission) {
        console.log('Has permission!');
      }
    });
  }
}
