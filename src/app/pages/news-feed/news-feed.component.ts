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
  newsMessage;
  url ;
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


  insertImage(event: any) {
    this.url = event.target.files[0];
    console.log(this.url);

  }

  newsfeed(message , title) {



   console.log(message);
   console.log(title);

   // tslint:disable-next-line:no-var-keyword
   var downloadURL: any;
   // tslint:disable-next-line:prefer-const
    let filename = this.url.name;
   const metaData = {'contentType': this.url.type};
   // create reference

   // tslint:disable-next-line:prefer-const
   let storageRef = firebase.storage().ref(name + '/' + filename);
   // upload the selected image to the storage
   // tslint:disable-next-line:prefer-const
   let uploadTask = storageRef.put(this.url, metaData);
   // Get the download URL
   storageRef.getDownloadURL().then((url) => {
     downloadURL = url;
     console.log(downloadURL);
   }).catch((error) => {
   });

    setTimeout(() => {
      firebase.database().ref('Newsfeed').push({
    message: message ,
        title: title ,
        image: downloadURL,


      });
    }, 3000);

    const myAlert = document.getElementsByClassName('customAlert0') as HTMLCollectionOf <HTMLElement>;
      const theOK = document.getElementById('theOkay' );
    const b = window.innerHeight;
  myAlert[0].style.top = (b / 3.5) + 'px';
  myAlert[0].style.left = '50%';
  myAlert[0].style.transform = 'translateX(-54%)';
    //  alert('You have successfully saved ')

  }
  dismissAlert() {
    const alerter = document.getElementsByClassName('customAlert0') as HTMLCollectionOf<HTMLElement>;
    alerter[0].style.left = '-100%';
    // this.message = 'please fill in your email and password' ;
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
