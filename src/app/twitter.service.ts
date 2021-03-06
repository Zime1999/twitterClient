import { Injectable } from '@angular/core';
import {Observable, merge, of, from} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http"; //edited
import { map, finalize, tap } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { mergeMap } from 'rxjs/operators';


const APP_KEY = 'VJo3sQiVrCc4bMnAtELq8Mjv0';
const APP_SECRET = 'jDBFp9vBEqrqSY2sJdsTV08sgZq3fjJDNpcZ35hYAWgkmCul3j';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  private tokenCredentials = window.btoa(`${APP_KEY}:${APP_SECRET}`);

  private getHeaders: Function = null;

  private searchText = "#javascript";
  
  public selectedTweet; 

  public data;

  constructor(
    public http: HttpClient,
    private geolocation: Geolocation,
    private loadingController:LoadingController) {  }  

   lat;
   long;
   geoSearchString: string;

    issueToken(): Observable<any> {

      const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': 'Basic ' + this.tokenCredentials
      });
      return this.http.post('https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth2/token', 'grant_type=client_credentials', { headers })
          .pipe(
            map((data: any) => {
              this.getHeaders = this.prebuildHeaders(data.access_token)
             
              return data.access_token;
          }));
  }
  /**
   * create a function which builds a header-object with the supplied accessToken
   * @param accessToken - retrieved accessToken
   */
  prebuildHeaders(accessToken: string): Function {
      return (optionalHeaders: { [key: string]: any }) => {

          return new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken,
              ...optionalHeaders
          });
      }
  }

  getSearchText(searchText: string){
    this.searchText = searchText;
  }

  public fetchData(isToggleOn: Boolean): Observable<any> {
    
   return this.issueToken()
      .pipe(
        mergeMap(() => isToggleOn ? this.search(this.geoSearchString) : this.search("")),
        map((data) => {
          this.data = data;
          return data;
        })
      );
  }

  public activateGPS(){
    this.geolocation.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.long = pos.coords.longitude;
      this.geoSearchString = `&geocode=${this.lat},${this.long},5km`;
      console.log(this.geoSearchString);
    }).catch(err => console.log(err));
  }



  public search(geoSearchString: string): Observable<any>{

      const searchPath = `https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=${encodeURIComponent(this.searchText)}` + geoSearchString;

      const headers = this.getHeaders({ some: 'value' })
      return this.http.get(searchPath, { headers });
  }
}