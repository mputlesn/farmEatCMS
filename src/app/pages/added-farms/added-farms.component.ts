import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';
import { Logs } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ifError } from 'assert';
import { t } from '@angular/core/src/render3';
import { Title } from '@angular/platform-browser';
import Chart from 'chart.js'

declare var google: any;
declare var firebase;


@Component({
  selector: 'app-added-farms',
  templateUrl: './added-farms.component.html',
  styleUrls: ['./added-farms.component.css']
})
export class AddedFarmsComponent implements OnInit {

  @ViewChild('name') name: ElementRef;
  @ViewChild('address') address: ElementRef;
  @ViewChild('farmType') farmType: ElementRef;
  @ViewChild('description') description: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('tel') tel: ElementRef;
  @ViewChild('website') website: ElementRef;
  @ViewChild('facebook') facebook: ElementRef;
  // @ViewChild('image') image: ElementRef;
  seltab = 'farms';
  FarmAquatic = false;
  Farmbees = false;
  FarmLivestock = false;
  Farmcrops = false;
  FarmFacebook;
  FarmWebsite;
  FarmTel = +27;
  FarmEmail;
  FarmAddress;
  FarmName;
  farmDescription;
  type;
  Farmpicture;
  farmImage;
  message: string;
  url;
  desLatLng;
  imageArr = [];
  err;
  imgError;
  testImg = [];
  product;
  itemsArr = [];
  itemLength = 0
  itemsProd = []
  val
  chooseItem;
  strPhone;
  newsTitle;
  News;
  city
  NewsImage;
  farmRating = new Array();
  allFarms =  new Array();
  farmName = new Array();
  farmViews = new Array();
  chart = []; // This will hold our chart info
  products = [
    'Search for products',
    'Banana',
    'Beetroot',
    'Broccoli',
    'Bull',
    'Carrot',
    'Celery',
    'Cheese',
    'Chicken',
    'Corn',
    'Cow',
    'Crab',
    'Cabbage',
    'Fish',
    'Garlic',
    'Goat',
    'Hay',
    'Hazelnut',
    'Honey',
    'Horse',
    'Juice',
    'Lamb',
    'Lettuce',
    'Milk',
    'Mashroom',
    'Orange',
    'Peanuts',
    'Pear',
    'Pig',
    'Potato',
    'Prown',
    'Rabbit',
    'Resberry',
    'Source',
    'Soy Beans',
    'Streberry',
    'Swan',
    'Tomato',
    'Turtle',
    'Watermelon',
    'Zucchini',
    'Spinach',
    'Onion',
    'Leek',
    'Corn',
    'Herbs',
    'Green Pepper',
    'Chilli Pepper',
    'Eggs'

  ];
  newsMessage;
  Description;
  correctTel;
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  lat = -26.2583;
  lon = 27.9014;
  farmsOnSlide = []
  newsFeed = []
  icon
  evt
  cityName
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




  constructor(private farmEAtDb: FarmEatService, private farmEat: FarmEatService, private router: Router) {
    console.log(document.getElementById("map"));
    this.newsFeed = []

    this.farmEAtDb.getallFarms().then((data) => {
      console.log(data);

    })

    farmEAtDb.getNewsFeed().then((data: any) => {
      console.log(data);
      this.newsFeed = data
    })

  }

  ngOnInit() {
    this.seltab = 'farms';

    console.log("alertc");

    this.farmEAtDb.test();
    this.showAddFarms();
    console.log("alert");

    this.initMap();
    console.log("map");



    console.log("showmap");

    this.getAllFarms()
    this.getViewStatsPerFarm()

  }




  insertImage(event: any) {
    this.url = event.target.files[0];
    console.log(this.url);

  }

  newsfeed() {

    // console.log(title);
    // console.log(message);
    // console.log(this.farmImage);
    console.log(this.newsTitle);
    console.log(this.newsTitle.length);


    console.log(this.News);
    console.log(this.url);
    console.log(this.NewsImage);



    // this.farmEat.test();
    // this.Title = "";
    // this.Description = "";

    if (this.newsTitle.length == 0 && this.News.length == 0) {
      this.farmEat.oops("Please enter all Details");
    } else if (this.newsTitle.length == 0) {
      this.farmEat.oops("Please enter title")
    } else if (this.News.length == 0) {
      this.farmEat.oops("Please enter description")

    } else if (this.NewsImage == undefined) {
      this.farmEat.oops("Please upload image ")

    }

    else {
      var downloadURL: any;
      var filename = this.url.name;
      const metaData = { 'contentType': this.url.type };
      //create reference
      var storageRef = firebase.storage().ref('NewsFeed' + '/' + filename)
      //upload the selected image to the storage
      var uploadTask = storageRef.put(this.url, metaData)
      // Get the download URL
      storageRef.getDownloadURL().then((url) => {
        downloadURL = url;

        setTimeout(() => {
          firebase.database().ref('Newsfeed/').push({


            message: this.News,
            title: this.newsTitle,
            image: downloadURL,


          }).catch((error) => {
            console.log("News Upload");
            console.log(error.message);

          })
          this.ngOnInit();
          this.farmEat.sucess("Added Successfully")
          this.News = ""
          this.newsTitle = ""
          this.NewsImage = ""
          // this.image.nativeElement.value = null;
        }, 3000)

      }).catch((error) => {
        console.log("Image Upload");
        console.log(error.message);
        this.farmEat.oops("Something went wrong while saving the news feed, please try saving again")

      });


      // this.image.nativeElement.value = null;


    }






  }

  // closeNav() {
  //   document.getElementById('mySidenav').style.width = '0';
  //   document.getElementById('main').style.marginLeft = '0';
  // }

  check() {
    var elem = document.getElementById('map')
    console.log(elem);
  }

  initMap() {

    var elem = document.getElementById('map')
    console.log(elem);

    const showallfarms = {
      center: { lat: this.lat, lng: this.lon },
      zoom: 12,
      disableDefaultUI: true,
      styles: this.mapStyle
    }

    this.map = new google.maps.Map(document.getElementById("map"), showallfarms);

    var allFarms = [];
    this.farmEAtDb.getallFarms().then((data: any) => {
      this.farmsOnSlide = data;
      console.log(this.farmsOnSlide);

      console.log("Farm Arrays");
      console.log(this.farmsOnSlide);
    })


    // this.farmEAtDb.getAllvideos().then((data)=>{
    //   console.log(data);

    // })


    setTimeout(() => {

      for (let index = 0; index < this.farmsOnSlide.length; index++) {
        console.log("inside forloop");
        //this.icon = "../../assets/icon/icons-tree.pin.png";
        if (this.farmsOnSlide[index].crops == true) {
          if (this.farmsOnSlide[index].aquatic == true) {
            this.icon = "../../../assets/icons-fish.pin.p ng";
            console.log(this.farmsOnSlide[index].aquatic);
          } else if (this.farmsOnSlide[index].beeKeeping == true) {
            this.icon = "../../../assets/icons-bee.pin.png";
          } else if (this.farmsOnSlide[index].liveStock == true) {
            this.icon = "../../../assets/icons-cow.pin.png";
          } else {
            this.icon = "../../../assets/icons-tree.pin.png";
          }
        } else if (this.farmsOnSlide[index].aquatic == true) {
          this.icon = "../../../assets/icons-fish.pin.png";
          console.log(this.farmsOnSlide[index].aquatic);
        } else if (this.farmsOnSlide[index].beeKeeping == true) {
          this.icon = "../../../assets/icons-bee.pin.png";
        } else if (this.farmsOnSlide[index].liveStock == true) {
          this.icon = "../../../assets/icons-cow.pin.png";
        }
        else {
          this.icon = "../../../assets/icons-tree.pin.png";
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




  loadMap() {

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
  logout() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['']);
      console.log('have logged out');

    }).catch(function (error) {
      // An error happened.
    });

  }


  moreInfo(description, title) {
    console.log(description);
    this.farmEAtDb.alertInfo(description, title)
  }

  moreInfonews(message, title, ) {
    console.log(message);
    this.farmEAtDb.alertInfo(message, title, )
  }
  openCity(evt, cityName) {
    console.log(evt);

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }



  clicked() {
    document.getElementById("hide").style.display = "block"
  }

  delete(i) {
    this.itemsArr.splice(i, 1);
    this.itemsProd.splice(i, 1);
    this.itemLength = this.itemsProd.length
  }

  smallPageCounter() {
    document.getElementById("myDropdown").classList.toggle("show");
  }


  getProducts(event: any) {

    console.log("hello search");
    this.val = event.target.value;
    console.log(this.val);
    console.log(this.products);


    if (this.val && this.val.trim() != '') {

      this.products = this.products.filter((item) => {
        console.log(item);
        console.log(this.products)
        return (item.toLowerCase().indexOf(this.val.toLowerCase()) > -1)

      })
      document.getElementById("hide").style.display = "block"
    } else {
      console.log("the item is empty", this.val, "look...");

      this.products = [
        'Banana',
        'Beetroot',
        'Broccoli',
        'Bull',
        'Carrot',
        'Celery',
        'Cheese',
        'Chicken',
        'Corn',
        'Cow',
        'Crab',
        'Cabbage',
        'Fish',
        'Garlic',
        'Goat',
        'Hay',
        'Hazelnut',
        'Honey',
        'Horse',
        'Juice',
        'Lamb',
        'Lettuce',
        'Milk',
        'Mashroom',
        'Orange',
        'Peanuts',
        'Pear',
        'Potato',
        'Prown',
        'Rabbit',
        'Resberry',
        'Source',
        'Soy Beans',
        'Streberry',
        'Swan',
        'Tomato',
        'Turtle',
        'Watermelon',
        'Zucchini',
        'Spinach',
        'Corn',
        'Onion',
        'Herbs',
        'Pigs',
        'Green Pepper',
        'Chilli Pepper',
        'Eggs',
      ];
    }

  }


  productClicked(item) {
    console.log(item);
    var icon;
    if (item == "Banana") {
      icon = "../../../assets/prodIcon/icons8-banana-48.png";
    } else if (item == "Beetroot") {
      icon = "../../../assets/prodIcon/icons8-beet-48.png";
    }
    else if (item == "Broccoli") {
      icon = "../../../assets/prodIcon/icons8-broccoli-48.png";
    }
    else if (item == "Bull") {
      icon = "../../../assets/prodIcon/icons8-bull-48.png";
    }
    else if (item == "Celery") {
      icon = "../../../assets/prodIcon/icons8-celery-48.png";
    } else if (item == "Cheese") {
      icon = "../../../assets/prodIcon/icons8-cheese-48.png";
    }
    else if (item == "Chicken") {
      icon = "../../../assets/prodIcon/icons8-chicken-48.png";
    }
    else if (item == "Corn") {
      icon = "../../../assets/prodIcon/icons8-corn-48.png";
    }
    else if (item == "Cow") {
      icon = "../../../assets/prodIcon/icons8-cow-48.png";
    }
    else if (item == "Crab") {
      icon = "../../../assets/prodIcon/icons8-crab-48.png";
    } else if (item == "Fish") {
      icon = "../../../assets/prodIcon/icons8-fish-48.png";
    }
    else if (item == "Garlic") {
      icon = "../../../assets/prodIcon/icons8-garlic-48.png";
    }
    else if (item == "Hay") {
      icon = "../../../assets/prodIcon/icons8-hay-48.png";
    }
    else if (item == "Hazelnut") {
      icon = "../../../assets/prodIcon/icons8-hazelnut-48.png";
    }
    else if (item == "Honey") {
      icon = "../../../assets/prodIcon/icons8-honey-48.png";
    } else if (item == "Horse") {
      icon = "../../../assets/prodIcon/icons8-horse-48.png";
    }
    else if (item == "Juice") {
      icon = "../../../assets/prodIcon/icons8-juice-48.png";
    }
    else if (item == "Lettuce") {
      icon = "../../../assets/prodIcon/icons8-lettuce-48.png";
    }
    else if (item == "Lamb") {
      icon = "../../../assets/prodIcon/icons8-lamb-48.png";
    }
    else if (item == "Milk") {
      icon = "../../../assets/prodIcon/icons8-milk-bottle-48.png";
    } else if (item == "Mushroom") {
      icon = "../../../assets/prodIcon/icons8-mushroom-48.png";
    } else if (item == "Orange") {
      icon = "../../../assets/prodIcon/icons8-orange-48.png";
    }
    else if (item == "Peanuts") {
      icon = "../../../assets/prodIcon/icons8-peanuts-48.png";
    }
    else if (item == "Pear") {
      icon = "../../../assets/prodIcon/icons8-pear-48.png";
    }
    else if (item == "Pig") {
      icon = "../../../assets/prodIcon/icons8-pig-48.png";
    }
    else if (item == "Potato") {
      icon = "../../../assets/prodIcon/icons8-potato-48.png";
    }
    else if (item == "Prawn") {
      icon = "../../../assets/prodIcon/icons8-prawn-48.png";

    } else if (item == "Rabbit") {
      icon = "../../../assets/prodIcon/icons8-rabbit-48.png";
    }
    else if (item == "Raspberry") {
      icon = "../../../assets/prodIcon/icons8-raspberry-48.png";
    }
    else if (item == "Source") {
      icon = "../../../assets/prodIcon/icons8-sourse-48.png";
    }
    else if (item == "Soy Beans") {
      icon = "../../../assets/prodIcon/icons8-soy-48.png";
    }
    else if (item == "Strawberry") {
      icon = "../../../assets/prodIcon/icons8-strawberry-48.png";
    }
    else if (item == "Swan") {
      icon = "../../../assets/prodIcon/icons8-swan-48.png";
    }
    else if (item == "Tomato") {
      icon = "../../../assets/prodIcon/icons8-tomato-48.png";
    }
    else if (item == "Turtle") {
      icon = "../../../assets/prodIcon/icons8-turtle-48.png";
    }
    else if (item == "Watermellon") {
      icon = "../../../assets/prodIcon/icons8-watermellon-48.png";
    }
    else if (item == "Goat") {
      icon = "../../../assets/prodIcon/icons8-year-of-goat-48.png";
    }
    else if (item == "Zucchini") {
      icon = "../../../assets/prodIcon/icons8-zucchini-48.png";
    }
    else if (item == "Onion") {
      icon = "../../../assets/prodIcon/Onion_96px.png";
    }
    else if (item == "Corn") {
      icon = "../../../assets/prodIcon/Corn_100px.png";
    }
    else if (item == "Leek") {
      icon = "../../../assets/prodIcon/Leek_96px.png";
    }
    else if (item == "Spinach") {
      icon = "../../../assets/prodIcon/icons8-lettuce-48.png";
    }
    else if (item == "Cabbage") {
      icon = "../../../assets/prodIcon/icons8_Cabbage_48px_1.png";
    }
    else if (item == "Pigs") {
      icon = "../../../assets/prodIcon/icons8-pig-48.png";
    } else if (item == "Green Pepper") {
      icon = "../../../assets/prodIcon/icons8-pig-48.png";
    }
    else if (item == "Green Pepper") {
      icon = "../../../assets/prodIcon/icons8_Paprika_48px_1.png";
    }
    else if (item == "Chilli Pepper") {
      icon = "../../../assets/prodIcon/icons8_Chili_Pepper_48px_1.png";
    }
    else if (item == "Herbs") {
      icon = "../../../assets/prodIcon/icons8_Plant_48px.png";
    }
    else if (item == "Eggs") {
      icon = "../../../assets/prodIcon/icons8-eggs-48.png";
    }





    if (item != 'Search for products') {

      var dup = this.itemsProd.indexOf(item)
      if (dup == -1) {
        this.itemsArr.push(icon)
        this.itemsProd.push(item)
        this.itemLength = this.itemsProd.length
      }

    }


    this.product = ""
    this.chooseItem = ""
    console.log(this.itemsArr);
    console.log(this.itemsProd);


    //document.getElementById("hide").style.display = "none"
  }

  insertImageForAddFarm(event: any) {
    this.url = event.target.files[0];
    if (this.url !== ' ' || this.url !== undefined) {
      
      console.log(this.testImg);

     

        let reader = new FileReader();
        reader.readAsDataURL(this.url);

        let selectedfile = this.url;
        let filename = selectedfile.name;

        let storageRef = firebase.storage().ref("Farms/" + filename);

        let metadata = { contentType: "image/jpeg", size: 0.75 };
        let uploadTask = storageRef.put(selectedfile, metadata).then((snapshot) => {
          console.log('image uploaded');

          // Get the download URL
          storageRef.getDownloadURL().then((url) => {
            console.log(url);
            this.testImg.push(url)
            console.log(this.testImg);
          }).catch((error) => {
          });
        });





    } else {
      const myAlert = document.getElementsByClassName('customAlert0') as HTMLCollectionOf<HTMLElement>;
      const theOK = document.getElementById('theOkay');
      const b = window.innerHeight;
      myAlert[0].style.top = (b / 3.5) + 'px';
      myAlert[0].style.left = '50%';
      myAlert[0].style.transform = 'translateX(-54%)';

    }


  }


  initMyMap() {

    console.log(this.farmType);


    let timerInterval
    Swal.fire({
      title: 'Loading',
      html: 'Please wait, still loading',
      timer: 3000,
      onBeforeOpen: () => {
        Swal.showLoading()

      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer')
      }
    })
   // console.log(this.FarmName, this.FarmAddress, farmtype, this.farmDescription, this.Farmcrops, this.FarmLivestock, this.Farmbees, this.FarmAquatic, this.FarmEmail, this.FarmTel, this.FarmWebsite, this.FarmFacebook);
    // console.log(names, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook);
    // console.log(farmType);
    // console.log(this.type);
    // console.log(description)

    var strNumber = '' + this.FarmTel
    console.log(strNumber.length);
    console.log(strNumber);
    var a = strNumber.substring(0, 2)

    console.log(a);


    console.log(this.farmType);



    if (a == "27") {
      this.correctTel = strNumber

    }

    console.log(strNumber);
    console.log(this.correctTel);

    console.log(strNumber.length);
    console.log("Before If");

    console.log(this.FarmName);

    console.log(this.farmDescription);
    console.log(this.FarmAddress);
    console.log(this.FarmTel);
    console.log(this.Farmpicture);

    

    if (this.FarmName == undefined && this.farmDescription == undefined && this.FarmAddress == undefined && this.FarmTel == +27 && this.Farmpicture == undefined) {

      this.farmEat.oops('Fill in all requeried fields');
    } else if (this.FarmName === undefined) {
      this.farmEat.oops('Fill in Farm name');
    }
    else if (a != "27") {
      this.farmEat.oops('Please make sure your number starts with +27');
    }
    else if (strNumber.length > 11) {
      this.farmEat.oops('Your number has more then the required 11 digits');
    } else if (strNumber.length < 11) {
      this.farmEat.oops('Your number has less then the required 11 digits');
    }
    else if (this.farmDescription === undefined) {
      this.farmEat.oops('Fill in farm Description');

    } else if (this.farmType === undefined) {
      this.farmEat.oops('Select farm type');

    } else if (this.FarmAddress.length === 0) {
      this.farmEat.oops('Fill in farm address');

    } else if (this.testImg.length == 0) {
      this.farmEat.oops('Insert Images of your farm');
    } else {

      console.log("else statement");

      console.log("all good");

      // tslint:disable-next-line:prefer-const
      
      // for (let index = 0; index < this.testImg.length; index++) {

      //   const filename = this.url.name;
      //   const metaData = { 'contentType': this.url.type };
      //   const storageRef = firebase.storage().ref().child(filename);
      //   const uploadTask = storageRef.put(this.url, metaData);



      //   storageRef.getDownloadURL().then((url) => {
      //     setTimeout(() => {
      //       this.imageArr.push(url);
      //       console.log(this.imageArr);
      //       this.err = 'good';
      //     }, 3000);
      //   }).catch((error) => {
      //     this.err = error.message;
      //     console.log(error.message);
      //     console.log(error);
      //     // this.farmEat.oops(error.message);

      //   });


      // }

      const geocoder = new google.maps.Geocoder;
      let lat;
      let lng;

      geocoder.geocode({ 'address': this.FarmAddress }, function (results, status) {
        if (status === 'OK') {
          var arr = results[0].address_components;
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
          this.city = arr[3].long_name
          console.log("city ", this.city);
          
        } else {


          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: "Please enter a correct address",

          });
        }
      });

      if (this.testImg !== []) {
        setTimeout(() => {

          // tslint:disable-next-line:max-line-length
          console.log(this.FarmName, this.FarmAddress, this.farmType, this.farmDescription, this.Farmcrops, this.FarmLivestock, this.Farmbees, this.FarmAquatic, this.FarmEmail, this.FarmTel, this.imageArr, lat, lng);


          if (this.FarmEmail == undefined) {
            if (this.FarmWebsite == undefined && this.FarmFacebook == undefined) {
              this.FarmEmail = " "
              this.FarmFacebook = " "
              this.FarmWebsite = " "

            } else if (this.FarmWebsite == undefined) {
              this.FarmEmail = " "
              this.FarmWebsite = " "
            } else if (this.FarmFacebook == undefined) {
              this.FarmEmail = " "
              this.FarmFacebook = " "
            } else {
              this.FarmEmail = " "

            }
          } else if (this.FarmEmail != undefined) {
            if (this.FarmWebsite == undefined && this.FarmFacebook == undefined) {
              this.FarmFacebook = " "
              this.FarmWebsite = " "
            } else if (this.FarmWebsite == undefined) {
              this.FarmWebsite = " "
            } else if (this.FarmFacebook == undefined) {
              this.FarmFacebook = " "
            }
          }



          console.log("facebook");

          console.log(this.FarmFacebook);

          if(this.imageArr != []){
            this.farmEat.addFarm(this.FarmName, this.FarmAddress, this.farmType, this.farmDescription, this.Farmcrops, this.FarmLivestock, this.Farmbees, this.FarmAquatic, this.FarmEmail, this.FarmTel, this.FarmWebsite, this.FarmFacebook, this.testImg, lat, lng, this.itemsArr, this.city).then(() => {
                  this.ngOnInit();
                  this.farmEat.sucess(" Farm Added Successfully");
          
            });


          this.FarmName = "" 
          this.FarmAddress = "" 
          this.farmDescription = ""
           this.Farmcrops = false
            this.FarmLivestock = false 
           this.Farmbees = false 
           this.FarmAquatic= false 
           this.FarmEmail = ""
           this.FarmTel = +27 
           this.FarmWebsite = ""
            this.FarmFacebook = ""
             this.imageArr  = []
              this.itemsArr = []
              this.itemLength = 0
              this.farmImage = ""
              this.testImg = []
              this.city = ""
          }




        }, 5000);



      } else {
        this.farmEat.oops(" Please add more Pictuers ")
      }



    }



  }

  oops(message) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: message,

    });
  }

  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }


  }


  showAddFarms() {
    document.getElementById("add-farm").style.display = 'block';
    document.getElementById("news-feed").style.display = 'none';
    document.getElementById("absoluteFarm").style.display = 'block';
    document.getElementById("absoluteNews").style.display = 'none';

  }
  absoluteFarm() {
    document.getElementById("absoluteFarm").style.display = 'none';
  }
  absoluteNews() {
    document.getElementById("absoluteNews").style.display = 'none';

  }

  closefarm() {
    document.getElementById("absoluteFarm").style.display = 'block';
  }
  closeNews() {
    document.getElementById("absoluteNews").style.display = 'block';

  }
  showNewsFeed() {
    document.getElementById("news-feed").style.display = 'block';
    document.getElementById("add-farm").style.display = 'none';
    document.getElementById("absoluteNews").style.display = 'block';
    document.getElementById("absoluteFarm").style.display = 'none';
  }

  addfarm() {
    console.log('click');
    if (document.getElementById('showfab').style.display == 'block') {
      document.getElementById('showfab').style.display = 'none'
      console.log('in');
    } else if (document.getElementById('showfab').style.display == 'none') {
      document.getElementById('showfab').style.display = 'block'
      console.log('out');
    }

    else {
      document.getElementById('showfab').style.display = 'block'
      console.log('out');

    }



  }


  show() {
    document.getElementById('showfab').style.display = 'none'
  }
  showf() {
    document.getElementById('showf').style.display = 'none'
  }


  add() {
    console.log('click');
    if (document.getElementById('showf').style.display == 'block') {
      document.getElementById('showf').style.display = 'none'
      console.log('in');
    } else if (document.getElementById('showf').style.display == 'none') {
      document.getElementById('showf').style.display = 'block'
      console.log('out');
    }

    else {
      document.getElementById('showf').style.display = 'block'
      console.log('out');

    }




  }

  getAllFarms() {

    return new Promise((resolve, reject) => {
      this.farmEat.getallFarms().then((data: any) => {
        this.allFarms = data
        console.log(data);

        for (let index = 0; index < this.allFarms.length; index++) {
          var rate = this.allFarms[index].farmRate;
          var name = this.allFarms[index].name

          this.farmRating.push(rate)
          this.farmName.push(name)
          console.log(this.farmRating);

        }

        
          //this.getFarmGeoStats()
    
       
            var ctx = document.getElementById("ratings");
            this.chart = new Chart("ratings", {
                type: 'doughnut',
                data: {
                  labels: this.farmName,
                  datasets: [{
                    label: 'my data',
                    data: this.farmRating,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }
              });
        
         
    
        
      })
      console.log(this.farmRating);
      console.log(this.farmName);

      resolve()
    })


  }

  getViewStatsPerFarm(){
    return new Promise((resolve, reject) => {
          this.farmEat.getFarmView().then((data:any)=>{
            console.log(data);
            console.log("dataViewed");
            
            this.farmViews = data
            console.log("FArm Views");
            console.log( this.farmViews);
            console.log(data);
            
            setTimeout(() => {
              var ctx = document.getElementById("views");
            this.chart = new Chart("views", {
                type: 'doughnut',
                data: {
                  labels: this.farmName,
                  datasets: [{
                    label: 'Number of Views per Farm',
                    data: this.farmViews,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }
              });
            }, 3000);
            
          }).catch((error)=>{
            console.log("number of views for this farm "+0);
          })

          resolve()
        })


    
  }

  
}
