import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
        this.router.navigate(['home'])
      }).catch(function(error) {
        // An error happened.
      });
    
  }
}
