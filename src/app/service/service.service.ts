import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public toastController: ToastController) { }

  async presentToast(message, position, duration, color) {
    const toast = await this.toastController.create({
      message,
      position,
      duration,
      color
    });
    toast.present();
  }

  async presentToastWithOptions(header, message, position, color, button1Text, button2Text) {
    const toast = await this.toastController.create({
      header,
      message,
      position,
      color,
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: button1Text,
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: button2Text,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
