import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmEatService } from '../../providers/farm-eat.service';


declare var firebase;
declare var google: any;
declare var firebase;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements  OnInit {
  formControlValue = '';
  message: string;
  url ;
  desLatLng;
  imageArr = [];
  err;
  imgError;
  testImg = [];
  products = [
    'Reda Marriott',
    'Cleta Cheatwood',
    'Penney Fortman',
    'Andy Mary',
    'Lilia Ricci',
    'Simonne Horne',
    'Marquis Macgillivray',
    'Ettie Koester',
    'Lovie Mero',
    'Gretta Ripley',
    'Jutta Casteel',
    'Donita Looby',
    'Patrice Guillotte',
    'Kirstin Sever',
    'Ezra Tremper',
    'Darell Monnier',
    'Elvira Balser',
    'Noriko Kluge',
    'Zulema Shake',
    'Kary Schreck'
  ];

constructor( private farmEat: FarmEatService, private router: Router) { }

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
    if (this.url !== ' ') {
      this.testImg.push(this.url);
      console.log(this.testImg);
    } else {
      const myAlert = document.getElementsByClassName('customAlert0') as HTMLCollectionOf <HTMLElement>;
      const theOK = document.getElementById('theOkay' );
    const b = window.innerHeight;
  myAlert[0].style.top = (b / 3.5) + 'px';
  myAlert[0].style.left = '50%';
  myAlert[0].style.transform = 'translateX(-54%)';

    }


  }

  initMyMap(name, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook) {
    // console.log(products);

    // tslint:disable-next-line:prefer-const
    let downloadURL: any;
    for (let index = 0; index < this.testImg.length; index++) {

      const filename = this.url.name;
      const metaData = {'contentType': this.url.type};
      const storageRef = firebase.storage().ref().child(filename);
      const uploadTask = storageRef.put(this.url, metaData);

      storageRef.getDownloadURL().then((url) => {
        this.imageArr.push(url);
        console.log(this.imageArr);
        this.err = 'good';
      }).catch((error) => {
        this.err = error.message;
        console.log(error.message);
        console.log(error);

      });


    }

    const geocoder = new google.maps.Geocoder;

    let lat;
    let lng;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        this.desLatLng = results[0].geometry.location;
        console.log('Des method ' + this.desLatLng);
        console.log(this.desLatLng);
        console.log('ghffdh' + this.desLatLng);
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        console.log(lat);
        console.log(lng);

       } else {
         alert('Geocode was not successful for the following reason: ' + status);
    //      const myAlert = document.getElementsByClassName('customAlert0') as HTMLCollectionOf <HTMLElement>;
    //      const theOK = document.getElementById('theOkay' );
    //    const b = window.innerHeight;
    //  myAlert[0].style.top = (b / 3.5) + 'px';
    //  myAlert[0].style.left = '50%';
    //  myAlert[0].style.transform = 'translateX(-54%)';
       }
    });

    setTimeout(() => {
      if (this.err === 'good') {
        // tslint:disable-next-line:max-line-length
        this.farmEat.addFarm(name, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, this.imageArr, lat, lng).then(() => {
        //  alert('added ')

      const myAlert = document.getElementsByClassName('customAlert0') as HTMLCollectionOf <HTMLElement>;
      const theOK = document.getElementById('theOkay' );
    const b = window.innerHeight;
  myAlert[0].style.top = (b / 3.5) + 'px';
  myAlert[0].style.left = '50%';
  myAlert[0].style.transform = 'translateX(-54%)';
        });
      }

    }, 3000);
console.log(name);
console.log(email);
name = ' ';
email = ' ';


// document.getElementById.( 'email');


// document.getElementById('name').style.display = 'none';
  }

  dismissAlert() {
    const alerter = document.getElementsByClassName('customAlert0') as HTMLCollectionOf<HTMLElement>;
    alerter[0].style.left = '-100%';
    this.message = 'please fill in your email and password' ;
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
