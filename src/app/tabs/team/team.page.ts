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
  filterdList: any = [];
  isLoading: boolean;
  id: string;
  TeamOpen = false;
  tweets: any = [];
  noTweet: boolean;
  constructor(private http: HTTP, private service: ServiceService, private platform: Platform, private iab: InAppBrowser) {
    this.platform.ready().then(() => {
      this.filterTweets();
    });
  }
  ngOnInit() {
  }

  async filterTweets(){
    console.clear();
    await this.http.get('https://api.twitter.com/1.1/lists/list.json?screen_name=tfdtheapp', {}, {
      Authorization: this.service.token
    }).then(async (response) => {
      this.twitterList = response.data;
      this.twitterList = JSON.parse(this.twitterList);
      this.filterdList = [];
      await this.twitterList.forEach(list => {
          if (list.description.includes('beat writers')){
              this.filterdList = this.filterdList.concat(list);
          }
      });
    }, (error) => {
      console.log(error);
    });

    console.log(this.filterdList);
  }


  async fetchTweets(id){
    console.clear();
    this.TeamOpen = true;
    this.isLoading = true;
    await this.http.get('https://api.twitter.com/1.1/lists/statuses.json?list_id=' + id + '&count=100', {}, {
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
  }

}
