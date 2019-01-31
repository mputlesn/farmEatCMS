import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import  UpdateKeyArr from '../profile/profile.component'
declare var firebase ;
declare var google: any;

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {
  farmName ;
  FarmEmail ;
  FarmTel ;
  FarmWebsite ;
  
  FarmFacebook
  FarmAddress ;
  farmDescription ;
  Farmcrops ;
  FarmLivestock ;
  Farmbees ;
  FarmAquatic ;
  FarmType;
  FarmImage ;
  keyArray = []
  profileArray = [] ;
  email =[] ;
  name =[];
  address  = [] ;
  tel = [] ;
  website = [] ;
  description  = [];
  crop = []
  livestock =[];
  bees = [] ;
  Aquatic = [] ;
  updateprofile = {}
  type =[] ;
  image =[]

  updateArray = UpdateKeyArr ;

  constructor(private farmEAtDb: FarmEatService,  private router: Router) { 

    console.log(this.updateArray);

    this.farmEAtDb.getAFarm(this.updateArray[0]).then((data:any)=>{
     this.keyArray =data.k
      this.name = data.name;
      this.email =data.email ;
      this.address =data.address ;
      this.tel =data.tel ;
      this.website =data.website
      this.description= data.description
      this.crop =data.crops;
      this.livestock=data.liveStock
      this.bees =data.beeKeeping;
      this.Aquatic =data.aquatic
      this.type =data.type;
      this.image =data.image[0]
    })
    

    // this.farmEAtDb.getProfile().then((data:any)=>{
      
    //   // this.keyArray = data[0].k ;
    //   // this. email =data[0].name

    //   // this.profileArray = data

    //   // this.name =data[0].name 

    //   // this.name = data[0].name;
    //   // this.email =data[0].email ;
    //   // this.address =data[0].address ;
    //   // this.tel =data[0].tel ;
    //   // this.website =data[0].website
    //   // this.description= data[0].description
    //   // this.crop =data[0].crops;
    //   // this.livestock=data[0].liveStock
    //   // this.bees =data[0].beeKeeping;
    //   // this.Aquatic =data[0].aquatic
    //   // this.type =data[0].type;
    //   // this.image =data[0].image[0]

    //   for (let index = 0; index < data.length; index++) {
    //     if(this.updateArray ==data[index].k){

    //        this. email =data[index].name

    //   this.profileArray = data

    //   this.name =data[index].name 

    //   this.name = data[index].name;
    //   this.email =data[index].email ;
    //   this.address =data[index].address ;
    //   this.tel =data[index].tel ;
    //   this.website =data[index].website
    //   this.description= data[index].description
    //   this.crop =data[index].crops;
    //   this.livestock=data[index].liveStock
    //   this.bees =data[index].beeKeeping;
    //   this.Aquatic =data[index].aquatic
    //   this.type =data[index].type;
    //   this.image =data[index].image[0]

        
    //     }
    //     break ;
        
    //   }
      

      
      
      
    //  })

    
    // this.name = this.profileArray[0].name;
    // console.log(this.name);

    
     
  }

  ngOnInit() {

    console.log(this.email);
    console.log(this.name);
    console.log(this.website);
    
    this.farmName=this.name;
    this.FarmEmail =this.email ;
    this.FarmAddress =this.address ;
    this.FarmTel = this.tel;
    this.FarmWebsite =this.website ;
    this.farmDescription =this.description
    this.Farmcrops =this.crop ;
    this.FarmLivestock =this.livestock;
    this.Farmbees =this.bees ;
    this.FarmType =this.type ;
    this.FarmImage= this.image



  }


  update(address){
    

this.farmEAtDb.test() ;

    
    console.log(this.email);
     console.log(this.keyArray);

     const geocoder = new google.maps.Geocoder;
    let lat
    let lng
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

     console.log(this.farmName);
     console.log(this.FarmEmail);
     console.log(this.FarmTel);
     console.log(this.FarmWebsite);
     console.log(address);
     
     
     
     
    
    let uid: any = firebase.auth().currentUser.uid
    setTimeout(()=>{
      this.updateprofile = {
        name:this.farmName,
        email:this.FarmEmail ,
        tel:this.FarmTel ,
        website :this.FarmWebsite ,
        description:this.farmDescription ,

  
        address:address ,
        lat:lat ,
        lng:lng ,
       
        
      }

    } , 3000)
  

    console.log(this.updateprofile);

    setTimeout(()=>{
      firebase.database().ref("UrbanFarmz/"+uid).child(this.updateArray[0]).update(this.updateprofile)

    }, 3000)
    
this.farmEAtDb.sucess("Updatess successfully")

//this.router.navigateByUrl('/profile');



  
    
  }
  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
  }
  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }


}
