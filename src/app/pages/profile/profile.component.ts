import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var firebase ;
declare var google: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  sIndex = [0];
  selectedindex: number = 0;
  seltab = 'i';
  profileArray = [] ;
  initial = 1;
  FarmObj:any

  updateKey
  coverUrl ;
  propicUrl;
  urlCover;
  urlPropic;
  facebook;
  farmName ;
  FarmEmail;
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
  // profileArray = [] ;
  email;
  name ;
  address  = [] ;
  tel = [];
  website = [] ;
  description= []  ;
  crop = []
  livestock =[];
  bees = [] ;
  Aquatic = [] ;
  updateprofile = {}
  type =[] ;
  image =[]
  updateemail ;
  updateAddress;
  updateDescription;
  updateTel;
  updateArray = UpdateKeyArr ;
  updateWebsite;
  updateFacebook;


  
  tempIndex ;

  constructor(private farmEAtDb: FarmEatService, private router: Router) { 
console.log();

    this.farmEAtDb.getProfile().then((data:any)=>{
      this.profileArray =data

    })

   
   
   
  

    
  }

  ngOnInit() {
    this.check();
   this.selectedindex;
   
   
    this.farmEAtDb.getProfile().then((data:any)=>{
      this.profileArray =data
      console.log(this.profileArray);
      
    })
    
  
  }
  nextpageupdate( ){

 
  console.log(this.tempIndex);
  
    
    document.getElementById('id01').style.display='block';
    UpdateKeyArr [0] = this.updateKey ;
    console.log(UpdateKeyArr);
    console.log(this.updateKey);
    console.log(this.description);
    console.log(this.website)
    console.log(this.facebook)

    console.log(this.profileArray[this.tempIndex]);
    console.log(this.profileArray[this.tempIndex].name);
    console.log(this.profileArray[this.tempIndex].tel);
    console.log(this.profileArray[this.tempIndex].description);

    this.name =this.profileArray[this.tempIndex].name;
    this.updateemail = this.profileArray[this.tempIndex].email;
    this.updateAddress = this.profileArray[this.tempIndex].address;
   this.updateTel = this.profileArray[this.tempIndex].tel
   this.updateDescription = this.profileArray[this.tempIndex].description
   this.FarmWebsite = this.profileArray[this.tempIndex].website;
   this.FarmFacebook = this.profileArray[this.tempIndex].facebook
     this.farmName = this.name
     this.FarmTel = this.updateTel
     this.FarmEmail = this.updateemail
     this.farmDescription = this.updateDescription
     //alert(this.updateprofile[this.tempIndex].tel);
     console.log(this.FarmWebsite);
     
   

    
console.log( this.updateDescription);
console.log( this.updateFacebook);
console.log(this.facebook)
    console.log(this.name);
    
    // this.router.navigateByUrl('/updatepage');
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['']);
      console.log('have logged out');

    }).catch(function(error) {
      // An error happened.
    });

}
  check(){
    if(this.initial == 1){
      this.FarmObj = this.profileArray[0]
      console.log(this.FarmObj);

      this.tempIndex = 0 ;
      
      this.initial = 0
      this.updateKey = this.FarmObj.k
      console.log(this.FarmObj.description);
      console.log(this.FarmObj.website)
      console.log(this.FarmObj.facebook)
    }
  }
  getFArm(key , index){
    console.log("clicked");
    console.log(this.sIndex)
    console.log(key);
    this.sIndex = index;
    this.tempIndex = index ;
 for (let i = 0; i < this.profileArray.length; i++) {
  if(this.profileArray[i].k.indexOf(key) > -1){
    this.updateKey = key
    //var ind = this.profileArray[i].k.indexOf(key);
    this.FarmObj = this.profileArray[i]
    console.log();
    
    console.log(this.FarmObj);
    
    
  }
 }
  }
  activateClass(subModule){
  subModule.active = !subModule.active;    
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





  
  update(address, farmtype){
    console.log(address, farmtype, this.farmName, this.farmDescription, this.FarmEmail, this.FarmTel,this.FarmWebsite,this.FarmFacebook);
    

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
    
            // this.navigateByUrl[('/profile')];
    
           } else {
            // alert('Geocode was not successful for the following reason: ' + status);
    
            // this.farmEat.oops('Geocode was not successful for the following reason');
           
            
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: "Please enter a correct address",
  
            });
            
             
            
    
           }
        });
        console.log("out")
         console.log(this.farmName);
         console.log(this.FarmEmail);
         console.log(this.FarmTel);
         console.log(this.FarmWebsite);
         console.log(address);
         console.log(this.name);
         console.log(this.FarmWebsite);
         
         
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
         
        
        let uid: any = firebase.auth().currentUser.uid
        setTimeout(()=>{
          this.updateprofile = {
            name:this.farmName,
            email:this.FarmEmail,
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
          firebase.database().ref("UrbanFarmz/"+uid).child(this.updateArray[0]).update(this.updateprofile).then(()=>{
            this.farmEAtDb.sucess("Updatess successfully")
            this.profileArray.splice(this.tempIndex , 1, this.updateprofile) ;
            this.FarmObj =  this.profileArray[this.tempIndex];
            document.getElementById('id01').style.display='none';

           

            console.log(this.FarmObj);
            
            this.ngOnInit() ;
           // this.router.navigateByUrl('/profile');
          })

        
    
        }, 3000)
        
        
    
    
        
    
    
      
        
      }
    
    
    

      // update ts

    // addfarmu(){
    //   console.log('click');
    //   if( document.getElementById('showfab').style.display == 'block'){
    //     document.getElementById('showfab').style.display = 'none'
    //  console.log('in');
    //   }else if (document.getElementById('showfab').style.display == 'none'){
    //     document.getElementById('showfab').style.display = 'block'
    //     console.log('out');
    //   }
      
    //   else{
    //     document.getElementById('showfab').style.display = 'block'
    //     console.log('out');
        
    //   }
      
     
     
    // }
    // show(){
    //   document.getElementById('showfab').style.display = 'none'
    // }
}
var UpdateKeyArr = [];
export default UpdateKeyArr; 