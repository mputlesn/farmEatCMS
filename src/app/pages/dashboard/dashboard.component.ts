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

  url ;
  desLatLng;
  imageArr = [];
  err;
  imgError
  testImg = []
  
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
    if(this.url != "undefined"){
      this.testImg.push(this.url)
      console.log(this.testImg);
    }
    
    
  }

  initMap(name, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, products) {

    console.log(products);
    
    var downloadURL: any;
    for (let index = 0; index < this.testImg.length; index++) {
    
      var filename = this.url.name;
      const metaData = {'contentType': this.url.type};
      var storageRef = firebase.storage().ref().child(filename);
      var uploadTask = storageRef.put(this.url, metaData);
  
      storageRef.getDownloadURL().then((url) => {
        this.imageArr.push(url);
        console.log(this.imageArr);
        this.err = "good";
      }).catch((error) => { 
        this.err = error.message;
        console.log(error.message);
        console.log(error);
        
        
      });

    }
   

    const geocoder = new google.maps.Geocoder;

    var lat;
    var lng;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        this.desLatLng = results[0].geometry.location;
        console.log("Des method "+this.desLatLng);
        console.log(this.desLatLng);
        console.log("ghffdh"+this.desLatLng);
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        console.log(lat);
        console.log(lng);
        
       } else {
         alert('Geocode was not successful for the following reason: ' + status);
       }
    });

    setTimeout(()=>{
      if(this.err == "good"){
        this.farmEat.addFarm(name, address,farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, this.imageArr, lat, lng).then(()=>{
         
        })
      }
     
    }, 5000)
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
