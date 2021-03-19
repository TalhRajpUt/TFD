import { ServiceService } from '../../service/service.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  query = '';
  spinner = false;
  noResult = false;
  users: any = [];
  tweets: any = [];
  media: any = [];
  nextPage = '';
  searchByUsername = false;
  constructor(private http: HTTP, private service: ServiceService,
              private iab: InAppBrowser) { }

  async searchQuery() {
    let baseUrl = '';
    console.log(this.searchByUsername);
    this.noResult = false;
    if (this.query === '' || this.query.length < 3) {
      this.clearSearch();
      return;
    } else {
        this.spinner = true;
        if (this.searchByUsername){
          if (!this.query.includes('from:')){
            this.query = 'from:' + this.query;
          }
      }
        baseUrl = 'https://api.twitter.com/2/tweets/search/recent?query=' + this.query +
        '&user.fields=name,profile_image_url,username,verified&tweet.fields=attachments,created_at,entities&media.fields=media_key,preview_image_url,type,url&max_results=50&expansions=attachments.media_keys,author_id';
      }
    let temp: any = [];
    await this.http.get(baseUrl, {}, { Authorization: this.service.token }).then((response) => {
          temp = JSON.parse(response.data);
          if (temp.meta.result_count === 0) {
            console.log(temp.meta.result_count);
            this.noResult = true;
          } else {
            this.tweets = this.tweets.concat(temp.data);
            this.media = this.media.concat(temp.includes.media);
            this.users = this.users.concat(temp.includes.users);
            this.nextPage = temp.meta.next_token;
            console.log(this.tweets);
            console.log(this.media);
            console.log(this.users);
          }
        }, (error) => {
          console.log(error);
        });
    this.spinner = false;
  }

  async eventSearch(event){
    let baseUrl = '';
    console.log(this.searchByUsername);
    if (this.searchByUsername){
          if (!this.query.includes('from:')){
            this.query = 'from:' + this.query;
          }
    }
    baseUrl = 'https://api.twitter.com/2/tweets/search/recent?query=' + this.query +
        '&user.fields=name,profile_image_url,username,verified&next_token=' + this.nextPage +
        '&tweet.fields=attachments,created_at,entities&media.fields=media_key,preview_image_url,type,url&max_results=10&expansions=attachments.media_keys,author_id';
    let temp: any = [];
    await this.http.get(baseUrl, {}, { Authorization: this.service.token }).then((response) => {
      temp = JSON.parse(response.data);
      if (temp.meta.result_count === 0 && event === null) {
        console.log(temp.meta.result_count);
      } else {
        this.tweets = this.tweets.concat(temp.data);
        this.media = this.media.concat(temp.includes.media);
        this.users = this.users.concat(temp.includes.users);
        this.nextPage = temp.meta.next_token;
        console.log(this.tweets);
        console.log(this.media);
        console.log(this.users);
      }
      if (temp.meta.result_count === 0 && event !== null){
        console.log(temp.meta.result_count);
        event.enable(false);
      }
      if (event !== null){
        event.target.complete();
      }
    }, (error) => {
      console.log(error);
    });
  }

  trigerEvent(event) {
      this.query = '';
      this.clearSearch();
      if (event.detail.checked){
        this.searchByUsername = true;
      }else{
        this.searchByUsername = false;
      }
    }

  clearSearch() {
      this.tweets = [];
      this.users = [];
      this.media = [];
      this.nextPage = '';
    }

    openTwitterLink(url): void{
      if (url === undefined || url === '' || url === null){
        return;
      }
      this.iab.create(url, '_blank', {hideurlbar: 'no', fullscreen: 'no', hidespinner: 'no',
        hidenavigationbuttons: 'yes', zoom: 'no', location: 'no', clearcache: 'yes', toolbar: 'yes', closebuttoncaption: 'Close'});
    }
}
