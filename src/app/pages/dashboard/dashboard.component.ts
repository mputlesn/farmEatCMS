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
  @ViewChild('image')image:ElementRef;
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
  product;
  itemsArr = []
  val
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

  clicked(){
    document.getElementById("hide").style.display = "block"
  }

  getProducts(event: any){
    
    console.log("hello search");
    this.val = event.target.value;
    console.log(this.val);
    console.log(this.products);
    

    if(this.val && this.val.trim() != ''){
     
      this.products = this.products.filter((item)=>{
        console.log(item);
        console.log(this.products)
        return (item.toLowerCase().indexOf(this.val.toLowerCase()) > -1)

      })
      document.getElementById("hide").style.display = "block"
    }else{
      console.log("the item is empty",this.val, "look...");
      
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
        'Zucchini',
      ];
    }
    
  }

  productClicked(item){
    console.log(item);
    var icon;
    if(item == "Banana"){
      icon = "../../../assets/prodIcon/icons8-banana-48.png";
    }else if(item == "Beetroot"){
      icon = "../../../assets/prodIcon/icons8-beet-48.png";
    }
    else if(item == "Broccoli"){
      icon = "../../../assets/prodIcon/icons8-broccoli-48.png";
    }
    else if(item == "Bull"){
      icon = "../../../assets/prodIcon/icons8-bull-48.png";
    }
    else if(item == "Celery"){
      icon = "../../../assets/prodIcon/icons8-celery-48.png";
    }else if(item == "Cheese"){
      icon = "../../../assets/prodIcon/icons8-cheese-48.png";
    }
    else if(item == "Chicken"){
      icon = "../../../assets/prodIcon/icons8-chicken-48.png";
    }
    else if(item == "Corn"){
      icon = "../../../assets/prodIcon/icons8-corn-48.png";
    }
    else if(item == "Cow"){
      icon = "../../../assets/prodIcon/icons8-cow-48.png";
    }
    else if(item == "Crab"){
      icon = "../../../assets/prodIcon/icons8-crab-48.png";
    }else if(item == "Fish"){
      icon = "../../../assets/prodIcon/icons8-fish-48.png";
    }
    else if(item == "Garlic"){
      icon = "../../../assets/prodIcon/icons8-garlic-48.png";
    }
    else if(item == "Hay"){
      icon = "../../../assets/prodIcon/icons8-hay-48.png";
    }
    else if(item == "Hazelnut"){
      icon = "../../../assets/prodIcon/icons8-hazelnut-48.png";
    }
    else if(item == "Honey"){
      icon = "../../../assets/prodIcon/icons8-honey-48.png";
    }else if(item == "Horse"){
      icon = "../../../assets/prodIcon/icons8-horse-48.png";
    }
    else if(item == "Juice"){
      icon = "../../../assets/prodIcon/icons8-juice-48.png";
    }
    else if(item == "Lettuce"){
      icon = "../../../assets/prodIcon/icons8-lettuce-48.png";
    }
    else if(item == "Lamb"){
      icon = "../../../assets/prodIcon/icons8-lamb-48.png";
    }
    else if(item == "Milk"){
      icon = "../../../assets/prodIcon/icons8-milk-bottle-48.png";
    }else if(item == "Mushroom"){
      icon = "../../../assets/prodIcon/icons8-mushroom-48.png";
    }else if(item == "Orange"){
      icon = "../../../assets/prodIcon/icons8-orange-48.png";
    }
    else if(item == "Peanuts"){
      icon = "../../../assets/prodIcon/icons8-peanuts-48.png";
    }
    else if(item == "Pear"){
      icon = "../../../assets/prodIcon/icons8-pear-48.png";
    }
    else if(item == "Pig"){
      icon = "../../../assets/prodIcon/icons8-pig-48.png";
    }
    else if(item == "Potato"){
      icon = "../../../assets/prodIcon/icons8-potato-48.png";
    }
    else if(item == "Prawn"){
      icon = "../../../assets/prodIcon/icons8-prawn-48.png";
    
    }else if(item == "Rabbit"){
      icon = "../../../assets/prodIcon/icons8-rabbit-48.png";
    }
    else if(item == "Raspberry"){
      icon = "../../../assets/prodIcon/icons8-raspberry-48.png";
    }
    else if(item == "Source"){
      icon = "../../../assets/prodIcon/icons8-sourse-48.png";
    }
    else if(item == "Soy Beans"){
      icon = "../../../assets/prodIcon/icons8-soy-48.png";
    }
    else if(item == "Strawberry"){
      icon = "../../../assets/prodIcon/icons8-strawberry-48.png";
    }
    else if(item == "Swan"){
      icon = "../../../assets/prodIcon/icons8-swan-48.png";
    }
    else if(item == "Tomato"){
      icon = "../../../assets/prodIcon/icons8-tomato-48.png";
    }
    else if(item == "Turtle"){
      icon = "../../../assets/prodIcon/icons8-turtle-48.png";
    }
    else if(item == "Watermellon"){
      icon = "../../../assets/prodIcon/icons8-watermellon-48.png";
    }
    else if(item == "Goat"){
      icon = "../../../assets/prodIcon/icons8-year-of-goat-48.png";
    }
    else if(item == "Zucchini"){
      icon = "../../../assets/prodIcon/icons8-zucchini-48.png";
    }
    else if(item == "Beetroot"){
      icon = "../../../assets/prodIcon/icons8-beet-48.png";
    }
    this.itemsArr.push(icon)
    this.product = ""
    console.log(this.itemsArr);
    
    //document.getElementById("hide").style.display = "none"
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
    this.farmEat.test();

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
       
        
        
        
         
        

       }
    });

    setTimeout(() => {
      if (this.err === 'good') {
        // tslint:disable-next-line:max-line-length
        this.farmEat.addFarm(names, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, this.imageArr, lat, lng, this.itemsArr).then(() => {
        //  alert('added ')
        

        this.farmEat.sucess('You added successfully');

        this.FarmFacebook = "";
        this.FarmWebsite = "";
        this.FarmTel = "";
        this.FarmEmail = "";
        this.FarmAddress = "";
        this.FarmName = "";
        this.farmDescription = "";
        this.farmType.nativeElement.value= "";
        this.image.nativeElement.value= null;

        this.imageArr = []
        });
      }

    }, 3000);
console.log(name);
console.log(email);


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
