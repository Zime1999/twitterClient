import { Component, OnInit } from '@angular/core';
import { TweetsPage } from '../tweets/tweets.page';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-selected-tweet',
  templateUrl: './selected-tweet.page.html',
  styleUrls: ['./selected-tweet.page.scss'],
})
export class SelectedTweetPage implements OnInit {

  constructor(private twitterService: TwitterService) { }

  singleTweet = this.twitterService.selectedTweet; 
  

  ngOnInit() {

   console.log("singletweet", this.singleTweet);
   
  }

}
