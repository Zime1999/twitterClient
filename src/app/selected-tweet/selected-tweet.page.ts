import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import * as moment from 'moment';



@Component({
  selector: 'app-selected-tweet',
  templateUrl: './selected-tweet.page.html',
  styleUrls: ['./selected-tweet.page.scss'],
})
export class SelectedTweetPage implements OnInit {

  constructor(private twitterService: TwitterService) { }

  
  singleTweet: any;
  niceDate: string;

  ngOnInit() {
    
  }
  
  ngDoCheck() {
    this.singleTweet = this.twitterService.selectedTweet;
    this.niceDate =  moment(this.twitterService.selectedTweet.created_at).format('DD/MM/YYYY, h:mm:ss a');
   
  }
}
