import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  login = false;
  constructor(public navCtrl: NavController,
              private platform: Platform,
              private fcm: FCM,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar) {
    this.validateLogin();
  }

  validateLogin(){
    if (this.login){
      this.navCtrl.navigateRoot('/login');
    }else{
      this.navCtrl.navigateRoot('/tabs');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#14171A');
      this.statusBar.overlaysWebView(false);
      this.statusBar.show();
      this.splashScreen.hide();
    });
  }

  fcmNotification(){
    this.fcm.getToken().then(token => {
      console.log(token);
    });

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped){
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });

    this.fcm.subscribeToTopic('marketing');

    this.fcm.hasPermission().then(hasPermission => {
      if (hasPermission) {
        console.log('Has permission!');
      }
    });
    this.fcm.clearAllNotifications();

    this.fcm.unsubscribeFromTopic('marketing');
  }
}
