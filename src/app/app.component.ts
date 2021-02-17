import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  login = false;
  constructor(public navCtrl: NavController) {
    this.validateLogin();
  }

  validateLogin(){
    if (!this.login){
      this.navCtrl.navigateRoot('/login');
    }else{
      this.navCtrl.navigateRoot('/tabs');
    }
  }
}
