import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { ServiceService } from './../../service/service.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  twitterList: any = [];
  isLoading = false;
  loadingTweets = false;
  id: string;
  loadingList = false;
  segment = 'NBA';
  filterdList: any = [];
  title = 'Teams';
  TeamOpen = false;
  tweets: any = [];
  noTweet = false;

  constructor(private http: HTTP, private service: ServiceService, private platform: Platform, private iab: InAppBrowser) {
    this.platform.ready().then(() => {
      this.filterTweets();
    });
  }
  ngOnInit() {
  }

  async filterTweets(){
    console.clear();
    this.isLoading = true;
    this.loadingList = true;
    await this.http.get('https://api.twitter.com/1.1/lists/ownerships.json?screen_name=tfdtheapp&count=1000', {}, {
      Authorization: this.service.token
    }).then(async (response) => {
      this.twitterList = response.data;
      this.twitterList = JSON.parse(this.twitterList);
      console.log(this.twitterList);
      this.twitterList = this.twitterList.lists;
      console.log('Complete Array', this.twitterList);
      await this.filterList();
      this.isLoading = false;
      this.loadingList = false;
    }, (error) => {
      console.log(error);
    });
  }


  async fetchTweets(id, name){
    console.clear();
    this.TeamOpen = true;
    this.isLoading = true;
    this.title = name;
    await this.http.get('https://api.twitter.com/1.1/lists/statuses.json?list_id=' + id + '&count=500', {}, {
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
    this.isLoading = false;
  }

  openTwitterLink(url): void{
    if (url === undefined || url === '' || url === null){
      return;
    }
    this.iab.create(url, '_blank', {hideurlbar: 'no', fullscreen: 'no', hidespinner: 'no',
      hidenavigationbuttons: 'yes', zoom: 'no', location: 'no', clearcache: 'yes', toolbar: 'yes', closebuttoncaption: 'Close'});
  }

  showTeamList(){
    this.TeamOpen = false;
    this.title = 'Team';
  }

  filterList(){
    switch (this.segment) {
      case 'NBA':
        this.filterListResult('Basketball beat writers');
        break;
      case 'MLB':
        this.filterListResult('Baseball beat writers');
        break;
      case 'NHL':
        this.filterListResult('Hockey beat writers');
        break;
      case 'NFL':
        this.filterListResult('Football beat writers');
        break;
      default:
        break;
    }
  }

  async filterListResult(matchCase){
    this.filterdList = [];
    this.isLoading = true;
    this.loadingList = true;
    await this.twitterList.forEach(list => {
      if (list.description.includes(matchCase)){
          this.filterdList = this.filterdList.concat(list);
      }
    });
    console.log('unSorted Array', this.filterdList);
    this.filterdList = this.filterdList.sort();
    console.log('Sorted Array', this.filterdList);
    this.filterdList = this.filterdList.reverse();
    console.log('Sorted Reverse Array', this.filterdList);
    this.isLoading = false;
    this.loadingList = false;
  }


}
