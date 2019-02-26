import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Logs } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { FarmEatService } from '../../providers/farm-eat.service';

declare var firebase;

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  @ViewChild('image')image:ElementRef; 
  newsMessage;
  Description;
  Title;
  url ;
  updateNews;
  constructor( private router: Router ,  private farmEat: FarmEatService) { }

  ngOnInit() {
   
  }



  insertImage(event: any) {
    this.url = event.target.files[0];

    
    console.log(this.url);

  }

  

  newsfeed(title, message) {
    this.farmEat.test();
this.Title = " ";
this.Description = "";

    if(title.length == 0 && message.length ==0){
      this.farmEat.oops("Please enter all Details");
    } else if (title.length == 0 ){
      this.farmEat.oops("Please enter title")
    } else if (message.length ==0){
      this.farmEat.oops("Please enter description")

    } else {
      var downloadURL: any;
      var filename = this.url.name;
      console.log("in");
      
      const metaData = {'contentType': this.url.type};
      //create reference
      var storageRef = firebase.storage().ref(name+'/'+filename)
      //upload the selected image to the storage
      var uploadTask = storageRef.put(this.url, metaData)
      // Get the download URL

      console.log("out");
      
      storageRef.getDownloadURL().then((url) => {
        downloadURL = url;
        console.log(downloadURL);
        console.log(title);
        console.log(message);
        console.log(url);
        
        
        
      }).catch((error) => {
      });
         setTimeout(()=>{
           firebase.database().ref('Newsfeed').push({
 
 
             message:message ,
             title:title ,
             image:downloadURL,
 
 
           })
           this.farmEat.sucess("Added Successfully")
         }, 3000)
      
         this.image.nativeElement.value = null;
    }



    
   

  }


  logout() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['']);
      console.log('have logged out');

    }).catch(function(error) {
      // An error happened.
    });

}

UpdateNewsFeed(){

  let uid: any = firebase.auth().currentUser.uid

  this.updateNews = {
    message: this.newsMessage,
    desc:this.Description,
    head:this.Title

  }
console.log(this.updateNews);

  firebase.database().ref("Newsfeed/" + uid).update(this.updateNews)
}
}
