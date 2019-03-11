import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-selected-tweet',
  templateUrl: './selected-tweet.page.html',
  styleUrls: ['./selected-tweet.page.scss'],
})
export class SelectedTweetPage implements OnInit {

  constructor(private twitterService: TwitterService) { }

  
  singleTweet: any;

  ngOnInit() {
    
  }
  
  ngDoCheck() {
    this.singleTweet = this.twitterService.selectedTweet; 
  }
}
