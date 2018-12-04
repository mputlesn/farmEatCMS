import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component'
import { FarmEatService } from '../app/providers/farm-eat.service'
declare var firebase
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
  title = 'app';



  logout(){
      firebase.auth().signOut().then(function() {
        console.log("logout");
        
        this.router.navigateByUrl('/home');
      }).catch(function(error) {
        // An error happened.
      });
    
  }
  

  // checkstate(){
  //   return new Promise((resolve, reject)=>{
  //   firebase.auth().onAuthStateChanged((user)=>
  //    {
  //     if (user != null) {
  //      // alert('user signed in')
  //      this.condition = 1
   
  //     } else {
   
  //       this.condition = 0
  //      // alert('no user signed in')
  //     }
  //     resolve(this.condition)
  //   })
 
  // })
  //}
}
