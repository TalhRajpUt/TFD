import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
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
  isLoading = false;
  opts = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    slidesOffsetBefore: 0
  };
  basketball = true;
  footbal = false;
  spinner = false;
  youtubeLoader = false;
  id;
  reader = false;
  segment = 'youtube';
  videosData: any = [];
  videos: any = [];
  nextPage = '';
  constructor(private http: HTTP, private service: ServiceService, private platform: Platform,
              private iab: InAppBrowser, private youtube: YoutubeVideoPlayer) {
    this.platform.ready().then(() => {
      this.tweetRequest();
    });
  }

  async tweetRequest() {
    console.log('Getting Tweets');
    switch (this.segment) {
      case 'Reports':
        this.id = this.service.reportsBaskitball;
        break;
      case 'Beat':
        this.id = this.service.beatBaskitball;
        break;
      case 'Fantasy':
        this.id = this.service.fantsyBasketball;
        break;
      case 'Injuries':
        this.id = this.service.injuryAnalysisBaskitball;
        break;
      case 'youtube':
        this.loadVideos('');
        this.id = false;
        break;
      default:
        this.id = this.service.reportsBaskitball;
        break;
    }
    if (this.id !== false){
      this.isLoading = true;
      await this.http.get('https://api.twitter.com/1.1/lists/statuses.json?list_id=' + this.id + '&count=500', {}, {
        Authorization: this.service.token
      }).then((response) => {
        this.tweets = response.data;
        this.tweets = JSON.parse(this.tweets);
        console.log(this.tweets);
      }, (error) => {
        console.log('Console Error', error);
      });
    }
    this.isLoading = false;
  }

  async activeSeation(index) {
    switch (index) {
      case 1:
        if (this.basketball) {
          return;
        }
        this.basketball = !this.basketball;
        this.footbal = false;
        this.reader = false;
        break;
      case 2:
        if (this.footbal) {
          return;
        }
        this.footbal = !this.footbal;
        this.basketball = false;
        this.reader = false;
        break;
      case 3:
        console.log('Tab is activated');
        if (this.reader) {

        }else{
          this.reader = !this.reader;
          this.basketball = false;
          this.footbal = false;
          this.spinner = true;
          console.log('Spinner is True');
          await new Promise(resolve => setTimeout(resolve, 5000));
          console.log('Spinner is False');
          this.spinner = false;
        }

        break;
      default:
        break;
    }
  }

  async loadVideos(event){
    let baseUrl = '';
    this.youtubeLoader = true;
    baseUrl = this.service.youtubeUrl + this.service.chanelID +
    '&order=date&type=video&maxResults=10&pageToken=' + this.nextPage + '&key=' + this.service.youtubeApiKey;
    await this.http.get(baseUrl, {}, {}).then((response) => {
      this.videosData = response.data;
      this.videosData = JSON.parse(this.videosData);
      console.log(this.videosData);
      this.videos = this.videos.concat(this.videosData.items);
      console.log(this.videos);
      this.nextPage = this.videosData.nextPageToken;
      console.log(this.nextPage);
      if (this.videos.length >= this.videosData.pageInfo.totalResults){
        event.enable(false);
      }
      if (event !== null){
        event.target.complete();
      }
    }, (error) => {
      console.log(error.error);
    });
    console.log(this.isLoading);
    this.youtubeLoader = false;
  }

  openTwitterLink(url): void{
    if (url === undefined || url === '' || url === null){
      return;
    }
    this.iab.create(url, '_blank', {hideurlbar: 'no', fullscreen: 'no', hidespinner: 'no',
      hidenavigationbuttons: 'yes', zoom: 'no', location: 'no', clearcache: 'yes', toolbar: 'yes', closebuttoncaption: 'Close'});
  }

  playVideo(id){
    this.youtube.openVideo(id);
  }

}
