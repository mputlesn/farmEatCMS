import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';
import { Logs } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ifError } from 'assert';
import { t } from '@angular/core/src/render3';
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
  @ViewChild('image') image: ElementRef;

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
  correctTel;
  Title;
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
    ' Chillie Source '
    ,'Sunflower'
    ,'Herbs'
    ,'Green pepper',
    'Herbs',
    'Meat',
    'Juice',
    'Red berry',
    'Raspberry',
    'Black berry'
    ,'Blue berry'
    
  ];
  newsMessage;
  Description;
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

  userPerMonth = [] ;

  constructor(private farmEAtDb: FarmEatService, private farmEat: FarmEatService, private router: Router) {



      
  this.CountUsers()

    console.log(document.getElementById("map"));


    this.farmEAtDb.getallFarms().then((data) => {
      console.log(data);

    })

    farmEAtDb.getNewsFeed().then((data: any) => {
      console.log(data);
      this.newsFeed = data
    })

  }

  ngOnInit() {

    this.farmEAtDb.test();
    this.showAddFarms();
    console.log("alert");

    this.initMap();
    console.log("map");



    console.log("showmap");

  }

  CountUsers(){

    this.farmEat.getMonths().then((data:any)=>{
      console.log(data);
      this.userPerMonth = data ;

      var count = 0
      console.log('before loop');
      
      for (let i = 0; i < this.userPerMonth.length; i++) {
        console.log('inside loop');
        console.log(this.userPerMonth[i].month);
        if (this.userPerMonth[i].month == undefined) {
          console.log('content undefined');
        } else if (this.userPerMonth[i].month == "Feb"){
          count += 1
        console.log(count); 
      } else if (this.userPerMonth[i].month == "Mar"){
        count += 1
      } else if (this.userPerMonth[i].month == "Apr"){
        count += 1
      } else if (this.userPerMonth[i].month == "May"){
        count += 1
      } else if (this.userPerMonth[i].month == "Jun"){
        count += 1
      } else if (this.userPerMonth[i].month == "Jul"){
        count += 1 
      } else if (this.userPerMonth[i].month == "Aug"){
        count += 1 
      } else if (this.userPerMonth[i].month == "Sep"){
        count += 1
      } else if (this.userPerMonth[i].month == "Oct"){
        count += 1
      } else if (this.userPerMonth[i].month == "Nov"){
        count += 1
      } else if (this.userPerMonth[i].month == "Dec"){
        count += 1  
      } else if (this.userPerMonth[i].month == "Jan"){
        count += 1
      }
      }
      console.log(count);  
      console.log(this.userPerMonth);   
    })
  }



  insertImage(event: any) {
    this.url = event.target.files[0];
    console.log(this.url);

  }

  newsfeed(title, message) {

    console.log(title);
    console.log(message);
    console.log(this.farmImage);



    this.farmEat.test();
    this.Title = "";
    this.Description = "";

    if (title.length == 0 && message.length == 0) {
      this.farmEat.oops("Please enter all Details");
    } else if (title.length == 0) {
      this.farmEat.oops("Please enter title")
    } else if (message.length == 0) {
      this.farmEat.oops("Please enter description")

    } else if (this.farmImage == undefined) {
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
        console.log(downloadURL);
        console.log(title);
        console.log(message);


      }).catch((error) => {
      });
      setTimeout(() => {
        firebase.database().ref('Newsfeed').push({


          message: message,
          title: title,
          image: this.url,


        })
        this.farmEat.sucess("Added Successfully")
      }, 3000)

      this.image.nativeElement.value = null;
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
    this.farmEAtDb.alertInfo(message, title)
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
        'Zucchini', 'Spinach',
        ' Chillie Source '
        ,'Sunflower'
        ,'Herbs'
        ,'Green pepper',
        'Herbs',
        'Meat',
        'Juice',
        'Red berry',
        'Raspberry',
        'Black berry'
        ,'Blue berry'
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
    else if (item == "Beetroot") {
      icon = "../../../assets/prodIcon/icons8-beet-48.png";
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
    if (this.url !== ' ') {
      this.testImg.push(this.url);
      console.log(this.testImg);
    } else {
      const myAlert = document.getElementsByClassName('customAlert0') as HTMLCollectionOf<HTMLElement>;
      const theOK = document.getElementById('theOkay');
      const b = window.innerHeight;
      myAlert[0].style.top = (b / 3.5) + 'px';
      myAlert[0].style.left = '50%';
      myAlert[0].style.transform = 'translateX(-54%)';

    }


  }


  initMyMap(names, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook) {
    console.log(farmType);
    console.log(this.type);

    var strNumber = '' + this.FarmTel
    console.log(strNumber.length);
    console.log(strNumber);
    var a = strNumber.substring(0, 2)

    console.log(a);


    console.log(this.farmType);



    if (a == "27") {
      this.correctTel = strNumber

    }


    // if (strNumber.length == 9) {
    //   console.log(strNumber, "9 digits");
    //   console.log(strNumber.length);
    //   var strNumber = '0' + this.FarmTel
    // } else if (strNumber.length == 10) {
    //   console.log(this.FarmTel, "10 digits");
    //   console.log(this.FarmTel.length);
    //   var strNumber = '' + this.FarmTel
    // } else if (strNumber.length > 10 || strNumber.length < 9) {
    //   console.log(this.FarmTel, "more or less than 10 digits");
    //   console.log(this.FarmTel.length);
    //   var strNumber = '' + this.FarmTel
    // }

    console.log(strNumber);
    console.log();

    console.log(strNumber.length);
    console.log("Before If");
    if (this.FarmName == undefined && this.farmDescription == undefined && this.FarmAddress == undefined && this.FarmTel == +27 && this.Farmpicture == undefined) {

      this.farmEat.oops('Fill in all requeried fields');
    } else if (this.FarmName === undefined) {
      this.farmEat.oops('Fill in Farm name');
    }
    else if (this.correctTel.length > 11) {
      this.farmEat.oops('Your number has more then the required 11 digits');
    } else if (this.correctTel.length < 11) {
      this.farmEat.oops('Your number has less then the required 11 digits');
    }
    else if (this.farmDescription === undefined) {
      this.farmEat.oops('Fill in farm Description');

    } else if (farmType === undefined) {
      this.farmEat.oops('Select farm type');

    } else if (address.length === 0) {
      this.farmEat.oops('Fill in farm address');

    } else {

      console.log("else statement");

      console.log("all good");

      // tslint:disable-next-line:prefer-const
      let downloadURL: any;
      for (let index = 0; index < this.testImg.length; index++) {

        const filename = this.url.name;
        const metaData = { 'contentType': this.url.type };
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

      geocoder.geocode({ 'address': address }, function (results, status) {
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

          // alert('Geocode was not successful for the following reason');

          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: "Please enter a correct address",

          });
        }
      });


      setTimeout(() => {

        // tslint:disable-next-line:max-line-length
        console.log(this.FarmName, address, this.farmType, this.farmDescription, this.Farmcrops, this.FarmLivestock, this.Farmbees, this.FarmAquatic, this.FarmEmail, this.FarmTel, this.imageArr, lat, lng);


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


        // if (this.FarmWebsite == 'undefined') {
        //   this.FarmWebsite = " "
        // } else {
        //   this.FarmFacebook = " "
        // }
        //name, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, downloadURL, lat, lng, products
        // tslint:disable-next-line:max-line-length
        console.log("facebook");

        console.log(this.FarmFacebook);

        this.farmEat.addFarm(names, address, this.farmType, this.farmDescription, this.Farmcrops, this.FarmLivestock, this.Farmbees, this.FarmAquatic, this.FarmEmail, this.FarmTel, this.FarmWebsite, this.FarmFacebook, this.imageArr, lat, lng, this.itemsArr).then(() => {
          this.farmEat.sucess(" Farm Added Successfully")
        });

      }, 3000);


    }

    // console.log("af If");

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
  }

  showNewsFeed() {
    document.getElementById("news-feed").style.display = 'block';
    document.getElementById("add-farm").style.display = 'none';

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


 


}
