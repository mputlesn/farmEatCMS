import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FarmEatService } from '../../providers/farm-eat.service';
import Swal from 'sweetalert2';
import { ifError } from 'assert';


declare var firebase;
declare var google: any;
declare var firebase;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements  OnInit {
  @ViewChild('name') name: ElementRef;
  @ViewChild('address') address: ElementRef;
  @ViewChild('farmType') farmType: ElementRef;
  @ViewChild('description') description: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('tel') tel: ElementRef;
  @ViewChild('website') website: ElementRef;
  @ViewChild('facebook') facebook: ElementRef;
  FarmAquatic = false;
  Farmbees = false;
  FarmLivestock = false;
  Farmcrops = false;
  FarmFacebook;
  FarmWebsite;
  FarmTel;
  FarmEmail;
  FarmAddress;
  FarmName;
  farmDescription;
  type;
  message: string;
  url ;
  desLatLng;
  imageArr = [];
  err;
  imgError;
  testImg = [];

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

  initMyMap(names, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook) {

  console.log(names);


    // console.log(products);

    // tslint:disable-next-line:prefer-const


    if (names.length === 0 &&  description.length === 0 && farmType.length === 0 && address.length === 0){
      this.farmEat.oops('Fill in all requeried fields');

    }else if (names.length === 0){
      this.farmEat.oops('Fill in Farmm name');

    }  else if (description.length === 0  ) {
      this.farmEat.oops('Fill in farm Description');
  
    } else if (farmType.length === 0 ) {
      this.farmEat.oops('Select farm type');
  
    } else if (address.length  === 0 ) {
      this.farmEat.oops('Fill in farm address');
  
    } else {

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

        // this.farmEat.oops('Geocode was not successful for the following reason');
        
        
        
        
         
        
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
        this.farmEat.addFarm(names, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, this.imageArr, lat, lng).then(() => {
        //  alert('added ')

        this.farmEat.sucess('You added successfully');

        this.FarmFacebook = "";
        this.FarmWebsite = "";
        this.FarmTel = "";
        this.FarmEmail = "";
        this.FarmAddress = "";
        this.FarmName = "";
        this.farmDescription = "";

        this.imageArr = []
        });
      }

    }, 3000);
console.log(name);
console.log(email);


    }
    



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


initMyMaps(address) {
  // tslint:disable-next-line:prefer-const
// alert('clicked');

console.log(this.FarmName);
console.log(this.FarmTel);
console.log(this.farmDescription);
console.log(this.type);
console.log(address.length);





  // tslint:disable-next-line:max-line-length
  if (this.FarmName === undefined && this.FarmTel === undefined && this.farmDescription === undefined && this.type === undefined && address.length === 0) {
    this.farmEat.oops('Fill in all requeried fields');

  } else if (this.FarmName === undefined ) {
    this.farmEat.oops('Fill in Farmm name');

  } else if (this.FarmTel === undefined ) {
    this.farmEat.oops('Fill infarm contact number');

  } else if (this.farmDescription === undefined ) {
    this.farmEat.oops('Fill in farm Description');

  } else if (this.type === undefined ) {
    this.farmEat.oops('Select farm type');

  } else if (address.length  === 0 ) {
    this.farmEat.oops('Fill in farm address');

  } else {

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
  let lat ;
  let lng ;

  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      this.desLatLng = results[0].geometry.location;
      console.log('Des method ' + this.desLatLng);
      console.log(this.desLatLng);
      console.log('ghffdh' + this.desLatLng);

      // tslint:disable-next-line:prefer-const
       lat = results[0].geometry.location.lat();
      // tslint:disable-next-line:prefer-const
       lng = results[0].geometry.location.lng();
      console.log(lat);
      console.log(lng);

     } else {
       // this.farmEat.oops('Geocode was not successful for the following reason: ' + status);
      // this.farmEat.oops('Geocode was not successful for the following reason: ' );

      alert('Geocode was not successful for the following reason');
     }
  });


  setTimeout(() => {
    
    // tslint:disable-next-line:max-line-length
    console.log(this.FarmName, address, this.farmType, this.farmDescription, this.Farmcrops, this.FarmLivestock, this.Farmbees, this.FarmAquatic, this.FarmEmail, this.FarmTel, this.imageArr, lat, lng);
    

    if(this.FarmEmail == 'undefined'){
        if(this.FarmWebsite == 'undefined' && this.FarmFacebook == 'undefined'){
          this.FarmEmail = ""
          this.FarmFacebook = ""
          this.FarmWebsite = ""

        }else if(this.FarmWebsite == 'undefined'){
          this.FarmEmail = ""
          this.FarmWebsite = ""
        }else if(this.FarmFacebook == 'undefined'){
          this.FarmEmail = ""
          this.FarmFacebook = ""
        }else{
          this.FarmEmail = ""




































        }
    }else if(this.FarmEmail != 'undefined') {
      if(this.FarmWebsite == 'undefined' && this.FarmFacebook == 'undefined'){
        this.FarmFacebook = ""
          this.FarmWebsite = ""
      }else if(this.FarmWebsite == 'undefined'){
        this.FarmWebsite = ""
      }else if(this.FarmFacebook == 'undefined'){
        this.FarmFacebook = ""
      }
    }
      
    
    // tslint:disable-next-line:max-line-length
    //this.farmEat.addFarm(this.FarmName, address, this.farmType, this.farmDescription, this.Farmcrops, this.FarmLivestock, this.Farmbees, this.FarmAquatic, this.FarmEmail, this.FarmFacebook, this.imageArr, lat, lng);

  }, 3000);


  }



}

oops(message) {
  Swal.fire({
    type: 'error',
    title: 'Oops...',
    text: message,

  });
}


}
