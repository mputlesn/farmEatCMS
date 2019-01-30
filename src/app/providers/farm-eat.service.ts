import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


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

        user.sendEmailVerification().then(function(a) {
          console.log(a);
          
        
        }).catch(function(error) {
        // An error happened.
        });


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

    console.log(name);
    let uid: any = firebase.auth().currentUser.uid;
   console.log(uid);
    return new Promise((resolve, reject) => {
      firebase.database().ref('UrbanFarms/'+ uid).push({
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
  oops(message) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: message,

    });
  }


  sucess(message) {
    Swal.fire({
      type: 'success',
      title: 'Successful',
      text: message,

    });
  }
  
  test(){
    let timerInterval
   Swal.fire({
    title: 'Loading',
    html: 'Please wait, still loading',
    timer: 2000,
    onBeforeOpen: () => {
      Swal.showLoading()
   
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
   }).then((result) => {
    if (
      // Read more about handling dismissals
      result.dismiss === Swal.DismissReason.timer
    ) {
      console.log('I was closed by the timer')
    }
   })
   
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

getProfile(){
  let uid: any = firebase.auth().currentUser.uid;
   console.log(uid);

   return new Promise((resolve ,reject)=>{

     firebase.database().ref('UrbanFarms/'+uid).on('value',(data:any)=>{

       var farms =data.val() ;
       console.log(farms);
       var keys:any =Object.keys(farms)
       console.log(keys);
       this.farmArray =[]
       for(var i =0 ; i <1; i++){
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


}


}
