import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var firebase;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  leader;

  message = '';
  linkValue = '/';
  forgot = 0;
  content = 'Sign In';
  username;
  pass;
  emailz;
  emailLogin;
  passwordLogin;
<<<<<<< HEAD
  constructor(private farmEat: FarmEatService, private router: Router) { 

  }
=======
  constructor(private farmEat: FarmEatService, private router: Router) { }
>>>>>>> 3a6e700d6d064ef68aed5ab8fad62069ce47ca70

  ngOnInit() {
    this.Logintab();
    
  }

  


  Login() {

    if(this.emailLogin == undefined && this.passwordLogin ==undefined){
      this.farmEat.oops("Please Enter email or Password")

    }else{

      this.farmEat.loginx(this.emailLogin, this.passwordLogin).then((data) => {
        console.log(data.user.emailVerified);
<<<<<<< HEAD
        this.router.navigateByUrl('/addedfarms');
       
=======
       if (data.user.emailVerified == true) {
        this.router.navigateByUrl('/addedfarms');
  
  
        } 
      else {
          this.farmEat.oops('Please verify your Email')
          firebase.auth().signOut().then(function () {
            console.log('logout');
  
            this.router.navigateByUrl('/home');
          }).catch(function (error) {
            // An error happened.
          });
  
        }
  
>>>>>>> 3a6e700d6d064ef68aed5ab8fad62069ce47ca70
  
      }).catch((error) => {
  
        this.farmEat.oops(error.message)
  
  
      })

    }
    

     

   
   }
  forgetpassword() {
<<<<<<< HEAD
    this.forgot = 1;
    this.content = 'Submit';
    this.farmEat.forgetPassword(this.emailLogin).then(() => {
      this.forgot = 1;
=======
    this.farmEat.forgetPassword().then(() => {
>>>>>>> 3a6e700d6d064ef68aed5ab8fad62069ce47ca70
    });

  }


  Registerz() {

    if (this.username === undefined && this.pass === undefined && this.emailz === undefined) {
      this.oops();
    } else if (this.username === undefined) {
      this.email();
    } else if (this.emailz === undefined) {
      this.name();

    } else if (this.pass === undefined) {
      this.password();

    } else {
<<<<<<< HEAD
      this.farmEat.register(this.emailz, this.pass, this.username).then(() => {
      //  this.router.navigateByUrl('/addedfarms');
       // this.test();
      //  this.farmEat.sucess("Please Check your Email and Verify")
=======

      this.farmEat.register(this.emailz, this.pass, this.username).then(() => {
        // this.router.navigateByUrl('/addedfarms');
        // this.test();
        this.farmEat.sucess("Please Check your Email and Verify")

        this.emailz = ""
        this.pass = ""
        this.username = ""
>>>>>>> 3a6e700d6d064ef68aed5ab8fad62069ce47ca70
      }, (error) => {
        this.cathingError(error.message);
      });

    }

<<<<<<< HEAD
=======


>>>>>>> 3a6e700d6d064ef68aed5ab8fad62069ce47ca70
  }


  test() {
    // tslint:disable-next-line:prefer-const
    let timerInterval;
    Swal.fire({
      title: 'Loading..',
      html: 'Please wait, still loading',
      timer: 3000,
      onBeforeOpen: () => {
        Swal.showLoading();

      },
      onClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer');
      }
    });

<<<<<<< HEAD
  }

  seccess() {
    Swal.fire({
      type: 'success',
      title: 'Success ',
      text: 'You have add Successfully',

    });
  }

=======
  }

  seccess() {
    Swal.fire({
      type: 'success',
      title: 'Success ',
      text: 'You have add Successfully',

    });
  }

>>>>>>> 3a6e700d6d064ef68aed5ab8fad62069ce47ca70
  name() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Please provide username.',

    });
  }
  oops() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'please enter all details',

    });
  }
  email() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Please provide email.',

    });
  }
  password() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'please provide password ',

    });
  }




  cathingError(message) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: message,

    });
  }

  registertab() {
    document.getElementById('register').style.display = 'block'
    document.getElementById('Login').style.display = 'none'



  }
  Logintab() {
    document.getElementById('Login').style.display = 'block'
    document.getElementById('register').style.display = 'none'

  }
}
