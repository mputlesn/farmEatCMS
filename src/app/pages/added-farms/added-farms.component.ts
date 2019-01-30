import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

declare var google: any;

@Component({
  selector: 'app-added-farms',
  templateUrl: './added-farms.component.html',
  styleUrls: ['./added-farms.component.css']
})
export class AddedFarmsComponent implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  lat = -25.7479;
  lon = 28.2293;
  farmsOnSlide = []
  icon
  abmarker
  mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#d1e2d1"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#99e4fd"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]
 
demo = [
  
]
  constructor(private farmEAtDb: FarmEatService) {
    console.log(document.getElementById("map"));
    //this.loadMap()
   
   
    
   }

  ngOnInit() {
    // this.initMap()
 

  this.initMap()
   
  }
  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
  }
  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

  check(){
    var elem = document.getElementById('map')
    console.log(elem);
  }

  initMap() {

    var elem = document.getElementById('map')
    console.log(elem);

     const showallfarms = {
      center: { lat: this.lat, lng: this.lon },
      zoom: 10,
      disableDefaultUI: true,
      styles: this.mapStyle
    }
    
    this.map = new google.maps.Map(document.getElementById("map"), showallfarms);
    
    var allFarms = [];
      this.farmEAtDb.getallFarms().then((data: any) => {
        this.farmsOnSlide = data;
        console.log(this.farmsOnSlide );
        
        console.log("Farm Arrays");
        console.log(this.farmsOnSlide);
      })


      

            setTimeout(() => {

        for (let index = 0; index < this.farmsOnSlide.length; index++) {
          console.log("inside forloop");
          //this.icon = "../../assets/icon/icons-tree.pin.png";
          if (this.farmsOnSlide[index].crops == "true") {
            if (this.farmsOnSlide[index].aquatic == "true") {
              this.icon = "../../../assets/icons-fish.pin.p ng";
              console.log(this.farmsOnSlide[index].aquatic);
            } else if (this.farmsOnSlide[index].beeKeeping == "true") {
              this.icon = "../../../assets/icons-bee.pin.png";
            } else if (this.farmsOnSlide[index].liveStock == "true") {
              this.icon = "../../../assets/icons-cow.pin.png";
            } else {
              this.icon = "../../../assets/icons-tree.pin.png";
            }
          } else if (this.farmsOnSlide[index].aquatic == "true") {
            this.icon = "../../../assets/icons-fish.pin.png";
            console.log(this.farmsOnSlide[index].aquatic);
          } else if (this.farmsOnSlide[index].beeKeeping == "true") {
            this.icon = "../../../assets/icons-bee.pin.png";
          } else if (this.farmsOnSlide[index].liveStock == "true") {
            this.icon = "../../../assets/icons-cow.pin.png";
          }


          var product = this.farmsOnSlide[index].products
          console.log(product);
          
          

          var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
          this.abmarker = new google.maps.Marker({
            map: this.map,
            icon: this.icon,


            position: { lat: parseFloat(this.farmsOnSlide[index].lat), lng: parseFloat(this.farmsOnSlide[index].lng) },
            label: name,
            zoom: 8,

          });

          // this.slideArr.push(this.abmarker)
          // console.log(this.slideArr);


        }
      }, 5000);
  
  }




  loadMap(){

    var latlng = new google.maps.LatLng(39.305, -76.617);
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 12
    });
     // const showallfarms = {
    //   center: { lat: this.lat, lng: this.lon },
    //   zoom: 10,
    //   disableDefaultUI: true,
    //   styles: this.mapStyle
    // }

    // this.map = new google.maps.Map(document.getElementById('map'), showallfarms);

    // console.log("getting all farms");

    // var allFarms = [];
    //   this.farmEAtDb.getallFarms().then((data: any) => {
    //     this.farmsOnSlide = data;
    //     console.log(this.farmsOnSlide );
        
    //     console.log("Farm Arrays");
    //     console.log(this.farmsOnSlide);
    //   })


    //   setTimeout(() => {

    //     for (let index = 0; index < this.farmsOnSlide.length; index++) {
    //       console.log("inside forloop");
    //       //this.icon = "../../assets/icon/icons-tree.pin.png";
    //       if (this.farmsOnSlide[index].crops == "true") {
    //         if (this.farmsOnSlide[index].aquatic == "true") {
    //           this.icon = "../../assets/icon/icons-fish.pin.png";
    //           console.log(this.farmsOnSlide[index].aquatic);
    //         } else if (this.farmsOnSlide[index].beeKeeping == "true") {
    //           this.icon = "../../assets/icon/icons-bee.pin.png";
    //         } else if (this.farmsOnSlide[index].liveStock == "true") {
    //           this.icon = "../../assets/icon/icons-cow.pin.png";
    //         } else {
    //           this.icon = "../../assets/icon/icons-tree.pin.png";
    //         }
    //       } else if (this.farmsOnSlide[index].aquatic == "true") {
    //         this.icon = "../../assets/icon/icons-fish.pin.png";
    //         console.log(this.farmsOnSlide[index].aquatic);
    //       } else if (this.farmsOnSlide[index].beeKeeping == "true") {
    //         this.icon = "../../assets/icon/icons-bee.pin.png";
    //       } else if (this.farmsOnSlide[index].liveStock == "true") {
    //         this.icon = "../../assets/icon/icons-cow.pin.png";
    //       }





    //       var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
    //       this.abmarker = new google.maps.Marker({
    //         map: this.map,
    //         icon: this.icon,


    //         position: { lat: parseFloat(this.farmsOnSlide[index].lat), lng: parseFloat(this.farmsOnSlide[index].lng) },
    //         label: name,
    //         zoom: 8,

    //       });

    //       // this.slideArr.push(this.abmarker)
    //       // console.log(this.slideArr);


    //     }
    //   }, 5000);

    //   console.log("outside forloop");
  }
 close() {
    var x = document.getElementById("myDIV");
     if (x.style.display === "block") {
      console.log(x.style.display);
      
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
}
