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
  constructor(private farmEat: FarmEatService, private router: Router) { 

  }

  ngOnInit() {
    this.Logintab();
    
  }



  Login() {

    if(this.emailLogin == undefined && this.passwordLogin ==undefined){
      this.farmEat.oops("Please Enter email or Password")

    }else{

      this.farmEat.loginx(this.emailLogin, this.passwordLogin).then((data) => {
        console.log(data.user.emailVerified);
        this.router.navigateByUrl('/addedfarms');
       
  
      }).catch((error) => {
  
        this.farmEat.oops(error.message)
  
  
      })

    }
    

     

   
   }
  forgetpassword() {
    this.forgot = 1;
    this.content = 'Submit';
    this.farmEat.forgetPassword(this.emailLogin).then(() => {
      this.forgot = 1;
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
      this.farmEat.register(this.emailz, this.pass, this.username).then(() => {
      //  this.router.navigateByUrl('/addedfarms');
       // this.test();
      //  this.farmEat.sucess("Please Check your Email and Verify")
      }, (error) => {
        this.cathingError(error.message);
      });

    }

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

  }

  seccess() {
    Swal.fire({
      type: 'success',
      title: 'Success ',
      text: 'You have add Successfully',

    });
  }

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
