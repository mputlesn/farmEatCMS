import { Component, OnInit } from '@angular/core';
declare var firebase;

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  newsMessage
  constructor() { }

  ngOnInit() {
  }


  newFeed(message , title , image){
    var users= firebase.auth().currentUser;
    var userid=users.uid
   
    return new Promise((resolve, reject)=>{
      firebase.database().ref('Newsfeed').push({
   
   
        message:message ,
        title:title ,
        image:image
   
      })
   
      resolve();
   
   })
  }
  

}