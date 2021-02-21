import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  tweetUrl;
  token = 'Bearer AAAAAAAAAAAAAAAAAAAAALHRMAEAAAAAF4H00EKyrqrDIZFyYDfm2FyRFTg%3D9syNG1vDJ9k1kLxqIMPq1p0AEWWk8qQwrIeDmfkFiehu3r2WLR';
  injuryAnalysisBaskitball = '1362811246928683012';
  fantsyBasketball = '1362811051688030216';
  youtubeApiKey = 'AIzaSyCnRPNldC2EgEnGpWJkm4uEwVOSqqjY3qM';
  youtubeUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=';
  chanelID = 'UC_RSmHtpdXN-0LZw6kljPCA';
  maxCount = 50;
  beatBaskitball = '1362810902601469954';
  reportsBaskitball = '1362810368104407043';
  constructor(public toastController: ToastController) {
   }

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
