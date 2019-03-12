import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TweetsPage } from './tweets/tweets.page';

const routes: Routes = [
  { path: '', redirectTo: 'tweets', pathMatch: 'full' },
  { path: 'tweets', component: TweetsPage },
  { path: 'selected-tweet', loadChildren: './selected-tweet/selected-tweet.module#SelectedTweetPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'mway', loadChildren: './mway/mway.module#MwayPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
