import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service'
import { Router } from '@angular/router';

declare var firebase;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  numberuserPerMonth


  linkValue = '/';
  constructor(private farmEat: FarmEatService, private router: Router) { 
   

  }

  ngOnInit() {
  }

 

  Login(email, password) {



    if (email !== undefined && password !== undefined) {
      this.farmEat.login(email , password).then(() => {
        // tslint:disable-next-line:prefer-const
        var users = firebase.auth().currentUser;
        console.log(users.uid);
        alert('Loggin in');
        this.router.navigateByUrl('/dashboard');
        // this.router.navigate(['dashboard']);
       // alert("Loggin in")
      
      } , (error) => {
        alert(error.message);

      });
    } else {
      alert('Please enter all details');
    }
  }

  Register(email, password, name) {
    console.log(name);
    if (email != null  && password  != null  ) {
    this.farmEat.register(email , password, name).then(() => {
    //  alert('We have sent an email to ' + email + ', please click the link to confirm your email')
    // this.router.navigate(['dashboard']);
    this.router.navigateByUrl('/dashboard');

    alert('You have registered successfully');
      // email = ""
      // password = ""
      // name = ""

    } , (error) => {
      alert(error.message);
    });
  } else {
    alert('Please enter the correct email or password')
  }
  }
}
