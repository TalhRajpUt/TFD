import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tweet: any = [];
  constructor() {
    this.tweet.img = 'https://cdn.jim-nielsen.com/ios/512/dropbox-2012-12-17.png';
    this.tweet.username = 'Talha RajpUt';
    this.tweet.handle = 'talharajput';
    this.tweet.date = new Date().getDate();
    this.tweet.text = 'In our example we build some nice cards with the user image, name, tweet, possible tweet image and also link to a URL which will be opened with the in app browser.';
    this.tweet.response = 45;
    this.tweet.retweet = 50;
    this.tweet.liked = 300;
  }

}
