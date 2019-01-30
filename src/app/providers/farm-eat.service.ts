import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


declare var firebase;
@Injectable({
  providedIn: 'root'
})
export class FarmEatService {
  condition;
  farmArray = []



  constructor(public http: HttpClient) { }

  register(email, password, name) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        // tslint:disable-next-line:prefer-const
        let uid: any = firebase.auth().currentUser.uid;
        firebase.database().ref('admins/' + uid).set({
          name: name,
          email: email,
        });

        // tslint:disable-next-line:prefer-const
        let user = firebase.auth().currentUser;

        // user.sendEmailVerification().then(function() {
        // // Email sent.
        // }).catch(function(error) {
        // // An error happened.
        // });


        resolve();

      }, (error) => {
        reject(error);
      });


    });
  }

  checkstate() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          // alert('user signed in')
          this.condition = 1;

        } else {

          this.condition = 0;
          // alert('no user signed in')
        }
        resolve(this.condition);
      });

    });
  }

  login(email, password) {


    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        resolve();
      }, Error => {
        reject(Error);
      });


    });


  }

  signout() {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
      // An error happened.
    });
  }



  // tslint:disable-next-line:max-line-length
  addFarm(name, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, downloadURL, lat, lng) {

    return new Promise((resolve, reject) => {
      firebase.database().ref('UrbanFarms').push({
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
      });
      resolve();
    });

  }

  forgetPassword(email) {

    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email) .then(() => {
              resolve();
      } , (error) => {
        reject(error);

      });

  });

  }

  getallFarms(){

    return new Promise((resolve ,reject)=>{
      firebase.database().ref('Farms').on('value',(data:any)=>{
      firebase.database().ref('UrbanFarms').on('value',(data:any)=>{

        var farms =data.val() ;
        console.log(farms);
        var keys:any =Object.keys(farms)
        console.log(keys);
        this.farmArray =[]
        for(var i =0 ; i <keys.length;i++){
          var  k =keys[i];
          let obj = {
            k:k ,
            lat:farms[k].lat ,
            lng:farms[k].lng ,
            name: farms[k].name ,
            description:farms[k].description ,
            type:farms[k].type ,
            address: farms[k].address ,
            aquatic: farms[k].aquatic ,
            crops:farms[k].crops ,
            tel:farms[k].tel ,
            email: farms[k].email ,
            image:farms[k].image ,
            beeKeeping:farms[k].beeKeeping ,
            liveStock:farms[k].liveStock ,
            facebook:farms[k].facebook
          }
          this.farmArray.push(obj) ;
          resolve(this.farmArray)
        }
      
      })

    })
  })
}
}
