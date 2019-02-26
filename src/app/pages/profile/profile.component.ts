import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';
import { Router } from '@angular/router';

declare var firebase;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileArray = [] ;
  initial = 1;
  FarmObj:any

  updateKey
  coverUrl ;
  propicUrl;
  urlCover;
  urlPropic;

  

  constructor(private farmEAtDb: FarmEatService, private router: Router) { 

    this.farmEAtDb.getProfile().then((data:any)=>{
      this.profileArray =data

    })
  

    
  }

  ngOnInit() {
    this.check();
  
  }
  nextpageupdate(){
    UpdateKeyArr [0] = this.updateKey ;
    console.log(UpdateKeyArr);
    console.log(this.updateKey);
    this.router.navigateByUrl('/updatepage');
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
      
      this.initial = 0
      this.updateKey = this.FarmObj.k
      console.log(this.FarmObj.description);
    }
  }
  getFArm(key){
    console.log("clicked");
    console.log(key);
 for (let i = 0; i < this.profileArray.length; i++) {
  if(this.profileArray[i].k.indexOf(key) > -1){
    this.updateKey = key
    //var ind = this.profileArray[i].k.indexOf(key);
    this.FarmObj = this.profileArray[i]
    console.log(this.FarmObj);
    
  }
 }
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
var UpdateKeyArr = [];
export default UpdateKeyArr; 