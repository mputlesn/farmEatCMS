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
  
  constructor(private farmEat:FarmEatService) { }

  ngOnInit() {
  }

  insertImage(event: any){
    this.url = event.target.files[0];
    console.log(this.url);
    
  }
  uploadImage(){
    var filename = this.url.name;
   console.log(filename);
   
  }

  // insertpic(event){
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

  initMap(name, address,farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, lat, lng){
    console.log(name, farmType, description);
    
    const geocoder = new google.maps.Geocoder;
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

    // var lat;
    // var lng;
    // geocoder.geocode({'address': address}, function(results, status) {
    //   if (status === 'OK') {
    //     this.desLatLng = results[0].geometry.location;
    //     console.log("Des method "+this.desLatLng);
    //     console.log(this.desLatLng);
    //     console.log("ghffdh"+this.desLatLng);
    //     lat = results[0].geometry.location.lat();
    //     lng = results[0].geometry.location.lng();
    //     console.log(lat);
    //     console.log(lng);
        
    //    } else {
    //      alert('Geocode was not successful for the following reason: ' + status);
    //    }
    // });

    setTimeout(()=>{
      this.farmEat.addFarm(name, address,farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, downloadURL, lat, lng).then(()=>{
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
