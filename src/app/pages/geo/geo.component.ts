import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';

declare var google: any;
declare var firebase;

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {

  url ;
  desLatLng;
  // imageArr = [
  //   "https://firebasestorage.googleapis.com/v0/b/farmeat-1542889200508.appspot.com/o/Urban%20Fresh%20South%20Africa%2FUrban%20Fresh.png?alt=media&token=914300a4-8a72-4428-a128-e66e17e021f7",
  //   "https://firebasestorage.googleapis.com/v0/b/farmeat-1542889200508.appspot.com/o/Urban%20Fresh%20South%20Africa%2FUrban%20Fresh2.jpg?alt=media&token=62960a9a-03e2-4220-9781-2961a1740809",
  //   "https://firebasestorage.googleapis.com/v0/b/farmeat-1542889200508.appspot.com/o/Urban%20Fresh%20South%20Africa%2FUrban%20Fresh3.jpg?alt=media&token=a23f24a6-558f-4dc0-a9d5-aabf2bf6b41e"
  // ];
  imageArr = []
  constructor(private farmEat:FarmEatService) { }

  ngOnInit() {
  }

  // addImage(){

  //   firebase.database().ref().update(this.imageArr);
  //   firebase.database().ref("UrbanFarms/").child("-LSO2BhObFca1MtRcRzn").set({
  //     image: this.imageArr
  //   })
  // }

  insertImage(event: any){
    this.url = event.target.files[0];
    // console.log(this.url);
    // var downloadURL: any;
    // var filename = this.url.name;
    // const metaData = {'contentType': this.url.type};
    // //create reference
    // var storageRef = firebase.storage().ref().child(filename)
    // //upload the selected image to the storage
    // var uploadTask = storageRef.put(this.url, metaData)
    // // Get the download URL
    // storageRef.getDownloadURL().then((url) => {
    //   this.imageArr.push(url);
    //   console.log(this.imageArr);
    // }).catch((error) => { 
    // });

  }
  

  // insertImage(event){
  //   if (event.target.files && event.target.files[0]) {
  //     let reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.url = event.target.result;
  //       console.log(this.url);


        
        
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //     console.log(event.target.files);
  //     let selectedfile = event.target.files[0];

  // }

  // }

  initMap(name, address,farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook){
    
    var downloadURL: any;
    var filename = this.url.name;
    const metaData = {'contentType': this.url.type};
    //create reference
    var storageRef = firebase.storage().ref().child(filename)
    //upload the selected image to the storage
    var uploadTask = storageRef.put(this.url, metaData)
    // Get the download URL
    storageRef.getDownloadURL().then((url) => {
      this.imageArr.push(url);
      console.log(this.imageArr);
    }).catch((error) => { 
    });

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
      this.farmEat.addFarm(name, address,farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, this.imageArr, lat, lng).then(()=>{
        alert("Farm Info Added")
      })
    }, 5000)
  }

  //getting coordinates from address
  // initMap(placeName) {
  //   const geocoder = new google.maps.Geocoder;
  //   geocoder.geocode({'address': placeName}, function(results, status) {
  //     if (status === 'OK') {
  //      this.desLatLng = results[0].geometry.location;
  //      console.log("Des method "+this.desLatLng);
  //      console.log(this.desLatLng);
  //      console.log("ghffdh"+this.desLatLng);
  //      var lat = results[0].geometry.location.lat();
  //      var lng = results[0].geometry.location.lng();
  //      console.log(lat);
  //      console.log(lng);
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // }
}
