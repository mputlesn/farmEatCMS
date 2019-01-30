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
  

  constructor(private farmEAtDb: FarmEatService, private router: Router) { 
   this.farmEAtDb.getProfile().then((data:any)=>{
       console.log(data);
       this.profileArray =data ;


      
     })


  }

  ngOnInit() {
  }

  nextpageupdate(){
    this.router.navigateByUrl('/updatepage');

  }

}
