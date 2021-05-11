import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { ServiceService } from './../../service/service.service';
import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-odds',
  templateUrl: './odds.page.html',
  styleUrls: ['./odds.page.scss'],
})
export class OddsPage {

  tweets: any = [];
  isLoading = true;
  opts = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    slidesOffsetBefore: 0
  };
  spinner = false;
  clientSecert = '';
  youtubeLoader = false;
  id;
  segment = 'tweets';
  videosData: any = [];
  videos: any = [];
  nextPage = '';
  chanelId = '';
  noTweet = false;
  constructor(private http: HTTP, private service: ServiceService,
              private iab: InAppBrowser, private storage: Storage) {
    this.storage.get('keys').then((response) => {
      console.log(response);
      this.clientSecert = response.token;
    });
  }

  async tweetRequestBasketBall() {
    console.log('Getting Tweets');
    switch (this.segment) {
      case 'tweets':
        this.id = this.service.bettingId;
        break;
      case 'webView':

        break;
      case 'bets':
        this.id = false;
        this.tweets = [];
        break;
      default:
        break;
    }
    if (this.id !== false) {
      this.isLoading = true;
      await this.http.get('https://api.twitter.com/1.1/lists/statuses.json?list_id=' + this.id + '&count=500', {}, {
        Authorization: this.service.token
      }).then((response) => {
        this.tweets = response.data;
        this.tweets = JSON.parse(this.tweets);
        if (this.tweets === null || this.tweets.length === 0) {
          this.noTweet = true;
        } else {
          this.noTweet = false;
        }
        this.isLoading = false;
        console.log(this.tweets);
      }, (error) => {
        console.log('Console Error', error);
        this.isLoading = false;
      });
    }
  }

  openLink() {
    this.iab.create('https://youtube.com/c/TheFantasyDoctors', '_blank', {
      hideurlbar: 'no', fullscreen: 'no', hidespinner: 'no',
      hidenavigationbuttons: 'yes', zoom: 'no', location: 'no', clearcache: 'yes', toolbar: 'yes', closebuttoncaption: 'Close'
    });
  }

  openTwitterLink(url): void {
    if (url === undefined || url === '' || url === null) {
      return;
    }
    this.iab.create(url, '_blank', {
      hideurlbar: 'no', fullscreen: 'no', hidespinner: 'no',
      hidenavigationbuttons: 'yes', zoom: 'no', location: 'no', clearcache: 'yes', toolbar: 'yes', closebuttoncaption: 'Close'
    });
  }


  ionViewDidEnter() {
    this.segment = 'tweets';
    this.tweetRequestBasketBall();
  }
}
