import { Component, OnInit } from '@angular/core';
import { Logs } from 'selenium-webdriver';
declare var firebase;

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  newsMessage

  url 
  constructor() { }

  ngOnInit() {
  }


  insertImage(event: any){
    this.url = event.target.files[0];
    console.log(this.url);
    
  }

  newsfeed(message , title , image){
   


   console.log(message);
   console.log(title);
   
   var downloadURL: any;
   var filename = this.url.name;
   const metaData = {'contentType': this.url.type};
   //create reference
   var storageRef = firebase.storage().ref(name+'/'+filename)
   //upload the selected image to the storage
   var uploadTask = storageRef.put(this.url, metaData)
   // Get the download URL
   storageRef.getDownloadURL().then((url) => {
     downloadURL = url;
     console.log(downloadURL);
   }).catch((error) => { 
   });

    setTimeout(()=>{
      firebase.database().ref('Newsfeed').push({
   
   
        message:message ,
        title:title ,
        image:downloadURL,
       
   
      })
    }, 3000)
      
   
     alert('You have successfully saved ')
  
  }
  

}