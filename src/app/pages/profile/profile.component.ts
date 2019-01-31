import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';
import { Router } from '@angular/router';
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

  constructor(private farmEAtDb: FarmEatService, private router: Router) { 
   this.farmEAtDb.getProfile().then((data:any)=>{
       console.log(data);
       this.profileArray =data ;


      
     })


  }

  ngOnInit() {
    this.check()
  }

  nextpageupdate(){

    UpdateKeyArr [0] = this.updateKey ;

    console.log(UpdateKeyArr);
    
    console.log(this.updateKey);
     
    this.router.navigateByUrl('/updatepage');


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
    if(this.initial == 1){
      this.FarmObj = this.profileArray[0]
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
  }
   
 }

   
    
    
  }

}


var UpdateKeyArr = [];

export default UpdateKeyArr;