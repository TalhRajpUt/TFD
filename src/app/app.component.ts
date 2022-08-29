import { ServiceService } from './service/service.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { LaunchReview } from '@ionic-native/launch-review/ngx';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';
// import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';

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
              // private twitter: TwitterConnect,
              // private router: Router
              private launchReview: LaunchReview,
              private service: ServiceService,
              private storage: Storage,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar) {
    this.initializeApp();
  }

  async validateLogin() {
    // await this.storage.get('keys').then(async (response) => {
    //   if (response === null || response === ''){
    //     await this.twitterLogin();
    //   }else{
    //
    //   }
    // });
    this.navCtrl.navigateRoot('/tabs');
    this.rateMyApp();
  }

  rateMyApp() {
    console.clear();
    // this.launchReview.launch()
    //   .then(() => console.log('Successfully launched store app'));
    if (this.launchReview.isRatingSupported() && localStorage.getItem('rating') !== '1') {
      this.launchReview.rating().subscribe((status) => {
        console.log('Successfully launched rating dialog', status);
        if (status === 'dismissed') {
          localStorage.setItem('rating', '1');
        }
      });
    }else{
      this.launchReview.launch().then((result) => {
        console.log(result);
      });
    }
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

  async fcmNotification() {

    this.fcm.hasPermission().then((response) => {
      if (!response) {
        this.fcm.requestPushPermission().then();
      }
    });

    this.fcm.getToken().then(token => {
      console.log(token);
      this.storage.set('token', token).then();

    });

    this.fcm.onNotification().subscribe(async data => {
      console.log('Notification Recived');
      if (data.wasTapped) {
        this.validateLogin();
      } else {
        this.service.presentToast('You have new Notification', 'top', 2000, 'dark');
      }
    });

    await this.storage.get('notification').then((response) => {
      if (response === null || response === '') {
        this.fcm.subscribeToTopic('MLB');
        this.fcm.subscribeToTopic('NBA');
        this.fcm.subscribeToTopic('NHL');
        this.fcm.subscribeToTopic('NFL');
        this.fcm.subscribeToTopic('ALL');
        console.log('SuccessfulySubcibed');
      }
    });
    this.fcm.hasPermission().then(hasPermission => {
      if (hasPermission) {
        console.log('Has permission!');
      }
    });
  }
}
