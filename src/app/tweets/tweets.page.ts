import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.page.html',
  styleUrls: ['./tweets.page.scss'],
})

export class TweetsPage implements OnInit {

  constructor(
    private twitterService: TwitterService,
    private loadingController: LoadingController,
    private alertController: AlertController) {
  }

  data: any;
  filteredData: any;
  filtersActive: Boolean = false;
  input: string;
  sortValue: string;
  searchText: string = "";
  locationToggle: Boolean;
  geoSearchString: string = this.twitterService.geoSearchString;
  missingData: Boolean = false;
  


  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();

    const subscription = this.twitterService.fetchData(this.locationToggle)
      .subscribe(
        data => (this.data = data.statuses, this.searchInTweet()),
        err => this.handleError());
    subscription.add(() => loading.dismiss());

    this.twitterService.activateGPS();
  }

  async handleError() {
    const alert = await this.alertController.create({
      header: 'Something failed',
      message: 'Please check internet-connection.',
      buttons: [
        {
          text: 'Try again',
          handler: () => {
            this.ngOnInit();
          }
        },
      ]
    });
    await alert.present();
  }


  searchInTweet(): void {
    this.data.length == 0 ? this.missingData = true : this.missingData = false;
    this.filteredData = this.data.filter((items) => {
      return items.text.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ||
        items.user.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
    })
    this.sort();
  }


  checkOnEnter(): void {
    if (this.input != "") {
      this.twitterService.getSearchText(this.input);
      this.ngOnInit();
    }
  }

  checkToggle(): void {
      this.ngOnInit();
  }

  activateFilters(): void {
    this.filtersActive = !this.filtersActive;
  }


  onSelect(tweet: any): void {
    this.twitterService.selectedTweet = tweet;
  }

  sort(): void {
    if (this.sortValue == "author") {
      this.filteredData.sort((a, b) => a.user.name.localeCompare(b.user.name));
    }
    else {
      this.filteredData.sort((a, b) => a.created_at.localeCompare(b.created_at));
    }
  }

  doRefresh(e: any): void {
    const subscription = this.twitterService.fetchData(this.locationToggle)
      .subscribe(
        data => (this.data = data.statuses, this.searchInTweet()),
        err => (console.log(err), this.handleError()));
    subscription.add(() => e.target.complete())
  }



}
