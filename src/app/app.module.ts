import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GeoPipe } from './page/geo.pipe';
import { NewsFeedComponent } from './pages/news-feed/news-feed.component';
//import { GeoComponent } from './pages/geo/geo.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import {GeoComponent} from './pages/geo/geo.component' ;




@NgModule({
  declarations: [
    AppComponent,
    GeoPipe,
    NewsFeedComponent ,
    GeoComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    NewsFeedComponent ,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'geo', component: GeoComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'dashboard', component: DashboardComponent} ,
      {path: 'newsfeed', component: NewsFeedComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
