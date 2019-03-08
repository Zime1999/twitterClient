import { Component, OnInit } from '@angular/core';
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
   
  }

  click(tweet){
    console.log("tweet from html: ", tweet.user.name);
    console.log("from service: ", this.singleTweet.user.name);
  }

}
