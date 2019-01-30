import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { polyfill as keyboardEventKeyPolyfill } from 'keyboardevent-key-polyfill';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';

import { AppComponent } from './app.component';
import { GeoPipe } from './page/geo.pipe';
import { NewsFeedComponent } from './pages/news-feed/news-feed.component';
// import { GeoComponent } from './pages/geo/geo.component';
import { HomeComponent } from './pages/home/home.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import {GeoComponent} from './pages/geo/geo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddedFarmsComponent } from './pages/added-farms/added-farms.component';

keyboardEventKeyPolyfill();





@NgModule({
  declarations: [
    AppComponent,
    GeoPipe,
    NewsFeedComponent ,
    GeoComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NewsFeedComponent,
    DashboardComponent,
    AddedFarmsComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TextInputAutocompleteModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'geo', component: GeoComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'newsfeed', component: NewsFeedComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'addedfarms', component: AddedFarmsComponent}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
