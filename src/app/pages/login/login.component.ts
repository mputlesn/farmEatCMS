import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service'
import { Router } from '@angular/router';

declare var firebase

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private farmEat: FarmEatService, private router: Router) { }

  ngOnInit() {
  }

  Login(email, password){

    
   
    if(email !=undefined && password !=undefined){
      this.farmEat.login(email ,password).then(()=>{
        var users= firebase.auth().currentUser;
        console.log(users.uid);      
       
      
        this.router.navigate(['dashboard']);
       
      } ,(error)=>{
        alert(error.message)
  
      })
    }else{
      alert('Please enter all details')
    }
  }
  

}
