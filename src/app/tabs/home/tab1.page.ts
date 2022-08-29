import { Storage } from '@ionic/storage';
import { NavController, Platform } from '@ionic/angular';
import { ServiceService } from './../../service/service.service';
import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  tweets: any = [];
  isLoading = true;
  masterlistID = '1374215564332269574';
  switchToMasterList = true;
  activeBasketBall = false;
  activeBaseBall = false;
  activeHockey = false;
  activeNflNews = false;
  activeFootBall = false;
  nflNews: any;
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
  clientSecert = '';
  youtubeLoader = false;
  id;
  segment = 'Injuries';
  videosData: any = [];
  videos: any = [];
  nextPage = '';
  chanelId = '';
  noTweet = false;
  constructor(private http: HTTP, private service: ServiceService, private platform: Platform,
              private iab: InAppBrowser, private storage: Storage, private navCtrl: NavController) {
    this.storage.get('keys').then((response) => {
      console.log(response);
      this.clientSecert = response.token;
    });
  }
  ngOnInit() {
  }

  async tweetRequestBasketBall() {
    console.log('Getting Tweets');
    if (this.switchToMasterList) {
      this.isLoading = true;
      await this.http.get('https://api.twitter.com/1.1/lists/statuses.json?list_id=' + this.masterlistID + '&count=500', {}, {
        Authorization: this.service.token
      }).then((response) => {
        this.tweets = response.data;
        this.tweets = JSON.parse(this.tweets);
        if (this.tweets === null || this.tweets.length === 0) {
          this.noTweet = true;
        } else {
          this.noTweet = false;
        }
        console.log(this.tweets);
        this.isLoading = false;
      }, (error) => {
        console.log('Console Error', error);
        this.isLoading = false;
      });
    } else {
      switch (this.segment) {
        case 'news':
          if (this.basketball) {
            this.id = this.service.reportsBaskitball;
          } else if (this.footbal) {
            this.id = this.service.newsFootball;
          } else if (this.baseball) {
            this.id = this.service.newsBaseBall;
          } else if (this.hocky) {
            this.id = this.service.newsHocky;
          }
          break;
        case 'Beat':
          if (this.basketball) {
            this.id = this.service.beatBaskitball;
          } else if (this.footbal) {
            this.id = this.service.beatFootball;
          } else if (this.baseball) {
            this.id = this.service.beatBaseBall;
          } else if (this.hocky) {
            this.id = this.service.beatHocky;
          }
          break;
        case 'Fantasy':
          if (this.basketball) {
            this.id = this.service.fantsyBasketball;
          } else if (this.footbal) {
            this.id = this.service.fantasyFootball;
          } else if (this.baseball) {
            this.id = this.service.fantsyBaseBall;
          } else if (this.hocky) {
            this.id = this.service.fantsyHocky;
          }
          break;
        case 'Injuries':
          if (this.basketball) {
            this.id = this.service.injuryAnalysisBaskitball;
          } else if (this.footbal) {
            this.id = this.service.injuryFootball;
          } else if (this.baseball) {
            this.id = this.service.injuryBaseBall;
          } else if (this.hocky) {
            this.id = this.service.injuryHocky;
          }
          break;
        case 'youtube':
          if (this.basketball) {
            this.chanelId = this.service.channelIdBaketball;
          } else if (this.footbal) {
            this.chanelId = this.service.channelIdFootball;
          } else if (this.baseball) {
            this.chanelId = this.service.channelIdBaseBall;
          } else if (this.hocky) {
            this.chanelId = this.service.channelIdHocky;
          }
          this.loadVideos('');
          this.id = false;
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
  }

  openLink() {
    this.iab.create('https://youtube.com/c/TheFantasyDoctors', '_blank', {
      hideurlbar: 'no', fullscreen: 'no', hidespinner: 'no',
      hidenavigationbuttons: 'yes', zoom: 'no', location: 'no', clearcache: 'yes', toolbar: 'yes', closebuttoncaption: 'Close'
    });
  }

  async loadVideos(event) {
    let baseUrl = '';
    this.youtubeLoader = true;
    baseUrl = this.service.youtubeUrl + this.chanelId +
      '&order=date&type=video&maxResults=10&pageToken=' + this.nextPage + '&key=' + this.service.youtubeApiKey;
    await this.http.get(baseUrl, {}, {}).then((response) => {
      this.videosData = response.data;
      console.log(this.videosData);
      this.videosData = JSON.parse(this.videosData);
      this.videos = this.videos.concat(this.videosData.items);
      this.youtubeLoader = false;
      this.nextPage = this.videosData.nextPageToken;
      if (this.videos.length >= this.videosData.pageInfo.totalResults) {
        event.enable(false);
      }
      if (event !== null) {
        event.target.complete();
      }
    }, (error) => {
      this.youtubeLoader = false;
      console.log(error.error);
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

  showBasketBall() {
    this.switchToMasterList = false;
    this.tweets = [];
    this.videosData = [];
    this.videos = [];
    this.basketball = true;
    this.footbal = false;
    this.baseball = false;
    this.hocky = false;
    this.nextPage = '';
    this.activeBaseBall = false;
    this.activeBasketBall = true;
    this.activeFootBall = false;
    this.activeHockey = false;
    this.tweetRequestBasketBall();
  }

  showFootBall() {
    this.switchToMasterList = false;
    this.tweets = [];
    this.videosData = [];
    this.videos = [];
    this.basketball = false;
    this.footbal = true;
    this.baseball = false;
    this.hocky = false;
    this.nextPage = '';
    this.activeBaseBall = false;
    this.activeBasketBall = false;
    this.activeFootBall = true;
    this.activeNflNews = false;
    this.activeHockey = false;
    this.tweetRequestBasketBall();
  }

  openNews(link){
    this.iab.create(link, '_blank', 'location=no,closebuttoncaption=close,mediaPlaybackRequiresUserAction=yes,hidenavigationbuttons=yes');
    return;
    this.service.currentNews = link;
    console.log(link);
    // return;
    this.navCtrl.navigateForward('/news');
  }

  openInjuryReport(){
    this.navCtrl.navigateForward('/Injury');
  }

  openYoutube(){
    this.switchToMasterList = false;
    this.tweets = [];
    this.videosData = [];
    this.videos = [];
    this.basketball = false;
    this.footbal = true;
    this.baseball = false;
    this.hocky = false;
    this.nextPage = '';
    this.activeBaseBall = false;
    this.activeBasketBall = false;
    this.activeFootBall = false;
    this.activeNflNews = false;
    this.activeHockey = false;
    this.segment = 'youtube';
    this.tweetRequestBasketBall();
  }


  showNFLNews() {
    this.switchToMasterList = false;
    this.tweets = [];
    this.videosData = [];
    this.videos = [];
    this.basketball = false;
    this.footbal = false;
    this.baseball = false;
    this.hocky = false;
    this.nextPage = '';
    this.activeNflNews = true;
    this.activeBaseBall = false;
    this.activeBasketBall = false;
    this.activeFootBall = false;
    this.activeHockey = false;
    this.retriveNews();
  }

  async retriveNews() {
    this.isLoading = true;
    await this.http.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=1000', {} , {}).then((response: any) => {
      this.nflNews = JSON.parse(response.data);
      this.nflNews = this.nflNews.articles;
      console.log(this.nflNews);
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      console.log(err);
      this.service.presentToast(err.message, 'bottom', 3000, 'danger');
    });
  }

  showBaseBall() {
    this.switchToMasterList = false;
    this.tweets = [];
    this.videosData = [];
    this.videos = [];
    this.basketball = false;
    this.footbal = false;
    this.baseball = true;
    this.hocky = false;
    this.nextPage = '';
    this.activeBaseBall = true;
    this.activeBasketBall = false;
    this.activeFootBall = false;
    this.activeHockey = false;
    this.tweetRequestBasketBall();
  }

  showHocky() {
    this.switchToMasterList = false;
    this.tweets = [];
    this.videosData = [];
    this.videos = [];
    this.basketball = false;
    this.footbal = false;
    this.baseball = false;
    this.hocky = true;
    this.nextPage = '';
    this.activeBaseBall = false;
    this.activeBasketBall = false;
    this.activeFootBall = false;
    this.activeHockey = true;
    this.tweetRequestBasketBall();
  }

  ionViewDidEnter() {
    this.switchToMasterList = true;
    this.segment = 'news';
    this.tweetRequestBasketBall();
  }
  // Like tweet
  likeATweet(id) {
    console.clear();
    const date: any = new Date();
    const epocValue = Math.round(date / 1000);
    console.log(epocValue);
    this.http.post(this.service.likeApi + id, {}, {
      authorization: 'OAuth oauth_consumer_key="' + this.service.consumerKey + '"&oauth_signature_method="HMAC-SHA1"&oauth_token="'
        + this.clientSecert + '"&oauth_version="1.0"&oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg"&oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D"&oauth_timestamp=' + epocValue
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
  // Retweet A Tweet
  retweet() {
    //
  }
  // Comment on a Tweet
  commentonTweet() {
    //
  }
}
