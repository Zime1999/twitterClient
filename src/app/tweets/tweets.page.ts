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
  filteredData: any;
  filtersActive: Boolean = false;
  input: string;
  sortValue: string;
  searchText: string = "";
  lat: any;
  long: any;
  locationToggle: Boolean;
  geoSearchString: string;


  async ngOnInit() {

    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();

    this.geolocation.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.long = pos.coords.longitude;
    }).catch(err => console.log(err));
  
    this.twitterService.issueToken()
      .pipe(
        mergeMap(() => this.twitterService.search(),
        ))
      .subscribe((data: any) => {
        loading.dismiss();
        this.data = data.statuses;
        console.log(data.statuses)
        this.searchInTweet();
      });
  }

  async getDataWithLocation(){
    this.geoSearchString = "geocode=" + this.lat + "," + this.long + "," + "5km";
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
    this.twitterService.issueToken()
      .pipe(
        mergeMap(() => this.twitterService.searchLocation(this.geoSearchString),
        ))
      .subscribe((data: any) => {
        loading.dismiss();
        this.data = data.statuses;
        console.log(data.statuses)
        this.searchInTweet();
      });
  }

  checkToggle(){
    if(this.locationToggle){
      this.getDataWithLocation()
    }
    else {
      this.ngOnInit();
    }
  }

  searchInTweet() {
    this.filteredData = _.filter(this.data, (items) => {
      return ((_.includes(items.text.toLowerCase(), this.searchText.toLowerCase())) || (_.includes(items.user.name.toLowerCase(), this.searchText.toLowerCase())))
    });
    this.sort();
  }

  
  checkOnEnter() {
    if (this.input != "") {
      this.twitterService.getSearchText(this.input);
      this.ngOnInit();
    }
  }

  activateFilters() {
    this.filtersActive = !this.filtersActive;
  }


  onSelect(tweet: any): void {
    this.twitterService.selectedTweet = tweet;
  }

  sort() {
    if (this.sortValue == "author") {
      this.filteredData.sort((a, b) => a.user.name.localeCompare(b.user.name));
    }
    else {
      this.filteredData.sort((a, b) => a.created_at.localeCompare(b.created_at));
    }
  }




  doRefresh(e) {
    this.twitterService.issueToken()
      .pipe(
        mergeMap(() => this.twitterService.search(),
        ))
      .subscribe((data: any) => {
        this.data = data.statuses;
        e.target.complete();
      })

  }



}
