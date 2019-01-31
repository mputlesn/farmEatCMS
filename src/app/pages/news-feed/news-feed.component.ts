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
  @ViewChild('title') title: ElementRef;
  @ViewChild('message') message: ElementRef;
  @ViewChild('image')image:ElementRef; 
  newsMessage;
  url ;
  constructor( private router: Router ,  private farmEat: FarmEatService) { }

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


  insertImage(event: any) {
    this.url = event.target.files[0];
    console.log(this.url);

  }

  

  newsfeed(title, message) {
    this.farmEat.test();


    if(title.length == 0 && message.length ==0){
      this.farmEat.oops("Please enter all Details");
    } else if (title.length == 0 ){
      this.farmEat.oops("Please enter title")
    } else if (message.length ==0){
      this.farmEat.oops("Please enter description")

    } else {
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
        console.log(title);
        console.log(message);
        
        
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



         this.title.nativeElement.value = " ";
         this.message.nativeElement.value = " ";
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
}
