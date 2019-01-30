import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';
import { Router } from '@angular/router';

declare var firebase;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  leader ;

  message= "";
  linkValue = '/';
  forgot = 0;
  content = 'Sign In';
  constructor(private farmEat: FarmEatService, private router: Router) { }

  ngOnInit() {
  }



  Login(email, password) {

    if (this.forgot === 1) {
      this.content = 'Submit';
      this.farmEat.forgetPassword(email).then(() => {
        this.content = 'Sign In';
        const myAlert = document.getElementsByClassName('customAlert01') as HTMLCollectionOf <HTMLElement>;
        const theOK = document.getElementById('theOkay' );
      const b = window.innerHeight;
    myAlert[0].style.top = (b / 3.5) + 'px';
    myAlert[0].style.left = '50%';
    myAlert[0].style.transform = 'translateX(-54%)';
      // alert('Please check your email to recover your password')
    })
    } else {
 
    if (email !== '' && password !== '') {
      this.farmEat.login(email , password).then(() => {
      const users = firebase.auth().currentUser;
        console.log(users.uid);
        this.router.navigateByUrl('/dashboard');
      } , (error) => {
        // this.message = 'Please insert your and email password';
        // theOK.style.display = 'block';
      });
      // alert('Good');
     } else {
      const myAlert = document.getElementsByClassName('customAlert0') as HTMLCollectionOf <HTMLElement>;
      const theOK = document.getElementById('theOkay' );
    const b = window.innerHeight;
  myAlert[0].style.top = (b / 3.5) + 'px';
  myAlert[0].style.left = '50%';
  myAlert[0].style.transform = 'translateX(-54%)';
      // alert('bad');
     }
    }


    }

  dismissAlert() {
    const alerter = document.getElementsByClassName('customAlert0') as HTMLCollectionOf<HTMLElement>;
    alerter[0].style.left = '-100%';
    this.message = 'please fill in your email and password' ;
  }
  dismissAlerts() {
    const alerter = document.getElementsByClassName('customAlert01') as HTMLCollectionOf<HTMLElement>;
    alerter[0].style.left = '-100%';
    this.message = 'please fill in your email and password' ;
  }

  Register(email, password, name) {

    let alerter = document.getElementsByClassName("custAlert") as HTMLCollectionOf <HTMLElement>;



    if(name == undefined || name == ''){

      alerter[0].style.left = "25%";
      console.log("name");
      this.message = "Please make sure to fill in your username"
      
    } 
    else if(email == null || email == ''){
      alerter[0].style.left = "25%";
      console.log("email");
      this.message = "Please insert your email address"
    }
    else if(password == null || password == ''){
      alerter[0].style.left = "25%";
      console.log("password");
      this.message = "Please enter your password";
      
    }
    else{

      this.farmEat.register(email , password, name).then(() => {
        //  alert('We have sent an email to ' + email + ', please click the link to confirm your email')
        // this.router.navigate(['dashboard']);

        this.router.navigateByUrl('/dashboard');
        } , (error) => {
          // this.message = error.message;
          // alert(error.message)
        } );
    }


    // console.log(name);
  //   if (email !== ''  && password  !== ''  ) {
    this.farmEat.register(email , password, name).then(() => {
    //  alert('We have sent an email to ' + email + ', please click the link to confirm your email')
    // this.router.navigate(['dashboard']);
    this.router.navigateByUrl('/dashboard');
    } , (error) => {
      alerter[0].style.left = "25%";
      this.message = error.message;
      // alert(error.message)
    } );
  // } else {
  //   const myAlert = document.getElementsByClassName('customAlert0') as HTMLCollectionOf <HTMLElement>;
  //   const theOK = document.getElementById('theOkay' );
  //   // const leader = document.getElementsByClassName('loading') as HTMLCollectionOf <HTMLElement>
  //   const b = window.innerHeight;

  // myAlert[0].style.top = (b / 3.5) + 'px';
  // myAlert[0].style.left = '50%';
  // myAlert[0].style.transform = 'translateX(-54%)';

  // }
  }
  dismissTheAlert(){
    let myAlerter = document.getElementsByClassName("custAlert") as HTMLCollectionOf <HTMLElement>;

    myAlerter[0].style.left = "-50%";
    this.message = "";
  }
  forgetpassword(){
    this.forgot = 1;
    this.content = 'Submit';
    // this.farmEat.forgetPassword(email).then(() =>{
    //   this.forgot = 1;
    // })

  }

}
