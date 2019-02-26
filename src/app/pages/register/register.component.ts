import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  numberuserPerMonth
  constructor(private farmEat: FarmEatService , private router: Router) { 

 
  }

  ngOnInit() {
  }


  Register(email, password, name){
    console.log(name);
    if(email !=null  && password  !=null  ){
    this.farmEat.register(email ,password,name).then(()=>{
     alert('We have sent an email to ' + email + ', please click the link to confirm your email')
      
      email = "" 
      password = ""
      name = ""
      this.router.navigateByUrl('/addedfarms');
    } , (error)=>{
      alert(error.message)
    })
  }else{
    alert('Please enter email and password')
  }

  }
}
