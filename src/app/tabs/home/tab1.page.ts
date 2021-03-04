import { Platform } from '@ionic/angular';
import { ServiceService } from './../../service/service.service';
import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tweets: any = [];
  isLoading = true;
  opts = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    slidesOffsetBefore: 0
  };
  basketball = true;
  footbal = false;
  baseball = false;
  hocky = false;
  spinner = false;
  youtubeLoader = false;
  id;
  segment = 'Injuries';
  videosData: any = [];
  videos: any = [];
  nextPage = '';
  chanelId = '';
  noTweet = false;
  constructor(private http: HTTP, private service: ServiceService, private platform: Platform,
              private iab: InAppBrowser) { }

  async tweetRequestBasketBall() {
    console.log('Getting Tweets');
    switch (this.segment) {
      case 'news':
        if (this.basketball){
        this.id = this.service.reportsBaskitball;
        }else if (this.footbal){
          this.id = this.service.newsFootball;
        }else if (this.baseball){
          this.id = this.service.newsBaseBall;
        }else if (this.hocky){
          this.id = this.service.newsHocky;
        }
        break;
      case 'Beat':
        if (this.basketball){
          this.id = this.service.beatBaskitball;
          }else if (this.footbal){
            this.id = this.service.beatFootball;
          }else if (this.baseball){
            this.id = this.service.beatBaseBall;
          }else if (this.hocky){
            this.id = this.service.beatHocky;
          }
        break;
      case 'Fantasy':
        if (this.basketball){
          this.id = this.service.fantsyBasketball;
          }else if (this.footbal){
            this.id = this.service.fantasyFootball;
          }else if (this.baseball){
            this.id = this.service.fantsyBaseBall;
          }else if (this.hocky){
            this.id = this.service.fantsyHocky;
          }
        break;
      case 'Injuries':
        if (this.basketball){
          this.id = this.service.injuryAnalysisBaskitball;
          }else if (this.footbal){
            this.id = this.service.injuryFootball;
          }else if (this.baseball){
            this.id = this.service.injuryBaseBall;
          }else if (this.hocky){
            this.id = this.service.injuryHocky;
          }
        break;
      case 'youtube':
        if (this.basketball){
          this.chanelId = this.service.channelIdBaketball;
          }else if (this.footbal){
            this.chanelId = this.service.channelIdFootball;
          }else if (this.baseball){
            this.chanelId = this.service.channelIdBaseBall;
          }else if (this.hocky){
            this.chanelId = this.service.channelIdHocky;
          }
        this.loadVideos('');
        this.id = false;
        break;
      default:
        break;
    }
    if (this.id !== false){
      this.isLoading = true;
      await this.http.get('https://api.twitter.com/1.1/lists/statuses.json?list_id=' + this.id + '&count=500', {}, {
        Authorization: this.service.token
      }).then((response) => {
        this.tweets = response.data;
        this.tweets = JSON.parse(this.tweets);
        if (this.tweets === null || this.tweets.length === 0){
          this.noTweet = true;
        }else{
          this.noTweet = false;
        }
        console.log(this.tweets);
      }, (error) => {
        console.log('Console Error', error);
      });
    }
    this.isLoading = false;
  }

  async loadVideos(event){
    let baseUrl = '';
    this.youtubeLoader = true;
    baseUrl = this.service.youtubeUrl + this.chanelId +
    '&order=date&type=video&maxResults=10&pageToken=' + this.nextPage + '&key=' + this.service.youtubeApiKey;
    await this.http.get(baseUrl, {}, {}).then((response) => {
      this.videosData = response.data;
      this.videosData = JSON.parse(this.videosData);
      this.videos = this.videos.concat(this.videosData.items);
      this.youtubeLoader = false;
      this.nextPage = this.videosData.nextPageToken;
      if (this.videos.length >= this.videosData.pageInfo.totalResults){
        event.enable(false);
      }
      if (event !== null){
        event.target.complete();
      }
    }, (error) => {
      this.youtubeLoader = false;
      console.log(error.error);
    });
  }

  openTwitterLink(url): void{
    if (url === undefined || url === '' || url === null){
      return;
    }
    this.iab.create(url, '_blank', {hideurlbar: 'no', fullscreen: 'no', hidespinner: 'no',
      hidenavigationbuttons: 'yes', zoom: 'no', location: 'no', clearcache: 'yes', toolbar: 'yes', closebuttoncaption: 'Close'});
  }

  showBasketBall(){
    this.tweets = [];
    this.videosData = [];
    this.videos = [];
    this.basketball = true;
    this.footbal = false;
    this.baseball = false;
    this.hocky = false;
    this.nextPage = '';
    this.tweetRequestBasketBall();
  }

  showFootBall(){
    this.tweets = [];
    this.videosData = [];
    this.videos = [];
    this.basketball = false;
    this.footbal = true;
    this.baseball = false;
    this.hocky = false;
    this.nextPage = '';
    this.tweetRequestBasketBall();
  }

  showBaseBall(){
    this.tweets = [];
    this.videosData = [];
    this.videos = [];
    this.basketball = false;
    this.footbal = false;
    this.baseball = true;
    this.hocky = false;
    this.nextPage = '';
    this.tweetRequestBasketBall();
  }

  showHocky(){
    this.tweets = [];
    this.videosData = [];
    this.videos = [];
    this.basketball = false;
    this.footbal = false;
    this.baseball = false;
    this.hocky = true;
    this.nextPage = '';
    this.tweetRequestBasketBall();
  }

  ionViewDidEnter(){
   this.segment = 'news';
   this.tweetRequestBasketBall();
  }
}
