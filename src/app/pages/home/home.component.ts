import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service'
import { Router } from '@angular/router';

declare var firebase;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  linkValue = "/"
  constructor(private farmEat: FarmEatService, private router: Router) { }

  ngOnInit() {
  }



  Login(email, password){

    
   
    if(email !=undefined && password !=undefined){
      this.farmEat.login(email ,password).then(()=>{
        var users= firebase.auth().currentUser;
        console.log(users.uid);      
        this.router.navigateByUrl('/dashboard');
        //this.router.navigate(['dashboard']);
       //alert("Loggin in")
      } ,(error)=>{
        alert(error.message)
  
      })
    }else{
      alert('Please enter all details')
    }
  }

  Register(email, password, name){
    console.log(name);
    if(email !=null  && password  !=null  ){
    this.farmEat.register(email ,password,name).then(()=>{
    //  alert('We have sent an email to ' + email + ', please click the link to confirm your email')
    //this.router.navigate(['dashboard']);
    this.router.navigateByUrl('/dashboard');
      // email = "" 
      // password = ""
      // name = ""
      
    } , (error)=>{
      alert(error.message)
    })
  }else{
    alert('Please enter the correct email or password')
  }
  }

}
