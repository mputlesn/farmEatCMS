import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var firebase;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout(){
    firebase.auth().signOut().then(()=>{
      this.router.navigate(['']);
      console.log("have logged out");
      
    }).catch(function(error) {
      // An error happened.
    });
  
}

}
