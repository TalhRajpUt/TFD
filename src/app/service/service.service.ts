import { Injectable } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  tweetUrl;
  token = 'Bearer AAAAAAAAAAAAAAAAAAAAALHRMAEAAAAAF4H00EKyrqrDIZFyYDfm2FyRFTg%3D9syNG1vDJ9k1kLxqIMPq1p0AEWWk8qQwrIeDmfkFiehu3r2WLR';
  baseUrl = 'http://socialapp.triteckodes.store/api/';
  youtubeApiKey = 'AIzaSyCnRPNldC2EgEnGpWJkm4uEwVOSqqjY3qM';
  youtubeUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=';
  maxCount = 50;

  // BasketBall Ids
  injuryAnalysisBaskitball = '1362811246928683012';
  beatBaskitball = '1362810902601469954';
  reportsBaskitball = '1362810368104407043';
  fantsyBasketball = '1362811051688030216';
  channelIdBaketball = 'PLBUG1anWQC-S8Gc8N07M2D-YFiObzRjrr';

  // football Ids
  newsFootball = '1367206022499164160';
  fantasyFootball = '1367205926567112705';
  injuryFootball = '1367205783327375363';
  beatFootball = '1367205865149902856';
  channelIdFootball = 'PLBUG1anWQC-R40pKxKXKlGxWWq3BnY5Qr';

  // Hocky Ids
  newsHocky = '1367205678746583041';
  fantsyHocky = '1367205602578083850';
  injuryHocky = '1367205423854583808';
  beatHocky = '1367205511200964609';
  channelIdHocky = 'PLBUG1anWQC-R8zrKy4fHrC88cBMrmeNKN';

  // BaseBall Ids
  newsBaseBall = '1365006736990552068';
  fantsyBaseBall = '1365007148015628289';
  injuryBaseBall = '1365007004075503617';
  beatBaseBall = '1365007256966807552';
  channelIdBaseBall = 'PLBUG1anWQC-QhPKtAFzLn8uadUhl4YCx3';

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
