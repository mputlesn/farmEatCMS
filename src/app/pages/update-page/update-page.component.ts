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
  updateDescription ;
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


  update(address, farmtype){
    

this.farmEAtDb.test() ;

console.log(this.FarmType);
console.log(farmtype);


    console.log("in")
    
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

        this.navigateByUrl[('/profile')];

       } else {
         alert('Geocode was not successful for the following reason: ' + status);

        // this.farmEat.oops('Geocode was not successful for the following reason');
       
        
        
        
         
        

       }
    });
    console.log("out")
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
        type:farmtype ,

  
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

this.router.navigate(['/profile']);



  
    
  }



  logout() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['']);
      console.log('have logged out');

    }).catch(function(error) {
      // An error happened.
    });

}
addfarm(){
  console.log('click');
  if( document.getElementById('showfab').style.display == 'block'){
    document.getElementById('showfab').style.display = 'none'
 console.log('in');
  }else if (document.getElementById('showfab').style.display == 'none'){
    document.getElementById('showfab').style.display = 'block'
    console.log('out');
  }
  
  else{
    document.getElementById('showfab').style.display = 'block'
    console.log('out');
    
  }
  
 
 
}
show(){
  document.getElementById('showfab').style.display = 'none'
}
}
