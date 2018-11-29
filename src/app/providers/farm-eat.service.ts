import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var firebase ;
@Injectable({
  providedIn: 'root'
})
export class FarmEatService {

  constructor(public http: HttpClient) { }

  register(email , password , name){
    return new Promise((resolve, reject)=>{
 
      firebase.auth().createUserWithEmailAndPassword(email , password) .then(()=>{
        var uid= firebase.auth().currentUser.uid;
        firebase.database().ref("admins/"+uid).set({
          name:name,
          email:email,
        })

        var user = firebase.auth().currentUser;
 
        user.sendEmailVerification().then(function() {
        // Email sent.
        }).catch(function(error) {
        // An error happened.
        });
 
 
        resolve();
 
      } , (error)=>{
        reject(error);
      });
 
 
 })
  }

  login(email , password){

  
    return new Promise((resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(email , password).then(()=>{
        resolve();
      }, Error =>{
        reject(Error)
      }) ;
    
     
  })
  
  
  }



  addFarm(name, address,farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, downloadURL, lat, lng){
    
    return new Promise((resolve, reject)=>{
      firebase.database().ref("UrbanFarms").push({
        lat: lat,
        lng: lng,
        name: name,
        address: address,
        type: farmType,
        description: description,
        crops: crops,
        liveStock: liveStock,
        beeKeeping: beeKeeping,
        aquatic: aquatic,
        email: email,
        tel: tel,
        website: website,
        facebook: facebook,
        image: downloadURL
      })
    resolve();
    })
    
  }
}
