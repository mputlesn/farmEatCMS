import { Component, OnInit } from '@angular/core';
import { Logs } from 'selenium-webdriver';
import { Router } from '@angular/router';
declare var firebase;

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  newsMessage

  url 
  constructor( private router: Router) { }

  ngOnInit() {
  }
  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
  }
  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }


  insertImage(event: any){
    this.url = event.target.files[0];
    console.log(this.url);
    
  }

  newsfeed(message , title){
   


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
  

  logout(){
    firebase.auth().signOut().then(()=>{
      this.router.navigate(['']);
      console.log("have logged out");
      
    }).catch(function(error) {
      // An error happened.
    });
  
}
}