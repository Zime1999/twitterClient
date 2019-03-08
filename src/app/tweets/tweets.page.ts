import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { mergeMap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as _ from 'lodash';


@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.page.html',
  styleUrls: ['./tweets.page.scss'],
})
export class TweetsPage implements OnInit {

  constructor(
    private twitterService: TwitterService, 
    public loadingController: LoadingController,
    private geolocation: Geolocation) { }

  data: any;
  input: string; 
  sortValue: string;
  searchText: string;
  lat: any;
  
  async ngOnInit() {

    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
    this.twitterService.issueToken()
    .pipe(
      mergeMap(() => this.twitterService.search(),
    ))
    .subscribe((data : any) => {
      loading.dismiss();
      this.data = data.statuses;
      console.log(data.statuses)
    }); 
    
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
    }).catch(err => console.log(err))
  }

checkOnEnter(){
  if(this.input != ""){
    this.twitterService.getSearchText(this.input);
    this.ngOnInit();
  }
}

  
  onSelect(tweet: any): void {
    this.twitterService.selectedTweet = tweet;
    
  }

  sort(){
    if(this.sortValue == "author") {
    this.data.sort((a,b) => a.user.name.localeCompare(b.user.name)); }
    else {
      this.data.sort((a, b) => a.created_at.localeCompare(b.created_at));
    }
    this.search();
  }

  search(){
    return _.filter(this.data, (v) => _.indexOf("honest", v.text) === -1);
    
  }


  doRefresh(e){
    console.log(this.search());
    this.twitterService.issueToken()
    .pipe(
      mergeMap(() => this.twitterService.search(),
    ))
    .subscribe((data : any) => {
      this.data = data.statuses;
      e.target.complete();
    })

  }
  

  
}
