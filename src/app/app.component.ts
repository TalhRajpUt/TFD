import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  login = false;
  constructor(public navCtrl: NavController,
              private platform: Platform,
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
