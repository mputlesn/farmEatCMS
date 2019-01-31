import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { FarmEatService } from '../app/providers/farm-eat.service';
declare var firebase;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
    this.checkstate()
   }
  title = 'app';



  logout() {
      firebase.auth().signOut().then(function() {
        console.log('logout');

        this.router.navigateByUrl('/home');
      }).catch(function(error) {
        // An error happened.
      });
  }

  checkstate() {
    return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
       // alert('user signed in')
       this.router.navigateByUrl('/dashboard');

      } else {

        this.router.navigateByUrl('/home');
       // alert('no user signed in')
      }
      // resolve(this.condition)
    });
   });
  }
}
