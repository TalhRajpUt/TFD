import { Injectable } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  tweetUrl;
  token = 'Bearer AAAAAAAAAAAAAAAAAAAAALHRMAEAAAAAF4H00EKyrqrDIZFyYDfm2FyRFTg%3D9syNG1vDJ9k1kLxqIMPq1p0AEWWk8qQwrIeDmfkFiehu3r2WLR';
  injuryAnalysisBaskitball = '1362811246928683012';
  baseUrl = 'http://socialapp.triteckodes.store/api/';
  fantsyBasketball = '1362811051688030216';
  youtubeApiKey = 'AIzaSyCnRPNldC2EgEnGpWJkm4uEwVOSqqjY3qM';
  youtubeUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=';
  chanelID = 'UC_RSmHtpdXN-0LZw6kljPCA';
  maxCount = 50;
  beatBaskitball = '1362810902601469954';
  reportsBaskitball = '1362810368104407043';

  constructor(public toastController: ToastController, private navCtrl: NavController) {
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

  async presentToastWithOptions(header, message, position, color, buttonText, path) {
    const toast = await this.toastController.create({
      header,
      message,
      position,
      color,
      buttons: [
        {
          side: 'end',
          text: buttonText,
          handler: () => {
            this.navCtrl.navigateRoot(path);
          }
        }
      ]
    });
    toast.present();
  }
}
