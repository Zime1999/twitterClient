import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.page.html',
  styleUrls: ['./tweets.page.scss'],
})
export class TweetsPage implements OnInit {

  constructor(private twitterService: TwitterService) { }

  data: any;
 
   
  
  ngOnInit() {
    
    this.twitterService.issueToken()
    .pipe(
      mergeMap(() => this.twitterService.search("#harrypotter"),
    ))
    .subscribe((data : any) => {
      console.log(data.statuses);
      this.data = data.statuses;
    })
   
  }

  hashtag: string = "#harrypotter";
  onEnter(value: string){
    this.twitterService.issueToken()
    .pipe(
      mergeMap(() => this.twitterService.search("this.hashtag"),
    ))
    .subscribe((data : any) => {
      this.data = data.statuses;
    })
  
  }

  
  
  onSelect(tweet: any): void {
    this.twitterService.selectedTweet = tweet;
  }


  doRefresh(e){
    this.twitterService.issueToken()
    .pipe(
      mergeMap(() => this.twitterService.search(this.hashtag),
    ))
    .subscribe((data : any) => {
      console.log(data.statuses);
      this.data = data.statuses;
      e.target.complete();
    })

  }
  

  
}
