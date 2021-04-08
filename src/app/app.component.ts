import { ServiceService } from './service/service.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
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
              private service: ServiceService,
              private storage: Storage,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar) {
    this.initializeApp();
  }

  async validateLogin(){
    // await this.storage.get('keys').then(async (response) => {
    //   if (response === null || response === ''){
    //     await this.twitterLogin();
    //   }else{
    //
    //   }
    // });
    this.navCtrl.navigateRoot('/tabs');
  }

  // twitterLogin(){
  //   this.twitter.login().then((detail) => {
  //     console.clear();
  //     console.log('Success');
  //     console.log(detail);
  //     this.storage.set('keys', detail).then();
  //     this.twitter.showUser().then((userProfile) => {
  //       console.log(userProfile);
  //       this.storage.set('profile', userProfile).then();
  //       this.navCtrl.navigateRoot('/tabs');
  //     });
  //   }, (error) => {
  //     console.clear();
  //     console.log('Error');
  //     console.log(error);
  //   });
  // }

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

  async fcmNotification(){
    this.fcm.getToken().then(token => {
      console.log(token);
      this.storage.set('token', token).then();

    });

    this.fcm.hasPermission().then((response) => {
      if (!response){
        this.fcm.requestPushPermission().then();
      }
    });

    this.fcm.onNotification().subscribe(async data => {
      console.log('Notification Recived');
      if (data.wasTapped){
        this.validateLogin();
      } else {
        this.service.presentToast('You have new Notification', 'top', 2000, 'dark');
      }
    });

    await this.storage.get('notification').then((response) => {
      if (response === null || response === ''){
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
