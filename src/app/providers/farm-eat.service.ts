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

  getAllFarmArray = []
  newFeedArray = []
  viewsArr = []

  constructor(public http: HttpClient) { }

  register(email, password, name) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        //tslint:disable-next-line:prefer-const
        let uid: any = firebase.auth().currentUser.uid;
        firebase.database().ref('admins/' + uid).set({
          name: name,
          email: email,
          cover: "../../../assets/1841196866.jpeg",
          proPicture: "../../../assets/Illustration-with-Variable-Rate_forWP.jpg"
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


  getNewsFeed(){

    return new Promise((resolve ,reject)=>{
      firebase.database().ref('Newsfeed').on('value' , (data:any)=>{
        var Newsfeed =data.val();
        var keys:any =Object.keys(Newsfeed);
        for(var i =0 ; i<keys.length;i++){
          var  k =keys[i] ;
          let NewsfeedObj = {
            k:k ,
            title: Newsfeed[k].title,
            message: Newsfeed[k].message,
            image:Newsfeed[k].image,

          }
          this.newFeedArray.push(NewsfeedObj);

          resolve( this.newFeedArray);
        }

      })
    })
   }

  getUser(){
    return new Promise ((accpt, rej) =>{
      
      let uid= firebase.auth().currentUser.uid;
      console.log(uid);
      firebase.database().ref('admins/'+uid).on('value' , (data:any)=>{
        var user =data.val();
        console.log(user);
        accpt(user)
       
      })
    })
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
  addFarm(name, address, farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, downloadURL, lat, lng, products, city) {

    
    let uid: any = firebase.auth().currentUser.uid;
   console.log(uid);
    return new Promise((resolve, reject) => {
      firebase.database().ref('UrbanFarmz/'+ uid).push({
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
        image: downloadURL,
        products: products,
        farmRate: 0,
        city: city
      });
      resolve();
    });

  }

  async forgetPassword() {
  // Swal.fire({
  //   title: 'Fill in your registered email address.',
  //   input: 'text',
  //   inputAttributes: {
  //     autocapitalize: 'off'
  //   },
  //   showCancelButton: true,
  //   confirmButtonText: 'Reset',
  //   showLoaderOnConfirm: true,
  //   preConfirm: (email) => {

  //      return new Promise((resolve, reject) => {
  //     firebase.auth().sendPasswordResetEmail(email) .then(() => {
  //             resolve();
  //     } , (error) => {
  //       reject(error);
        
  //     });
  // });
  //   }
  // })
    

   

  const {value: email} = await Swal.fire({
    title: 'Input email address',
    input: 'email',
    inputPlaceholder: 'Enter your email address',

    
   })
   
       return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email) .then(() => {
              resolve();
      } , (error) => {
        reject(error);
        
      });
      if (email) {
    // Swal.fire('Your email ' + email +  'has been reset ')
    Swal.fire(`Your email password has been resend, please check ${email} 
    to reset. `)
   }
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
  
  alertInfo(message , title) {
    Swal.fire({
     
     title: title,
      text: message,

    });
  }
  
  test(){
    let timerInterval
   Swal.fire({
    title: 'Loading',
    html: 'Please wait, still loading',
    timer: 3000,
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
      firebase.database().ref('UrbanFarmz').on('value',(data2:any)=>{

        var farms =data.val() ;
        var farms2 =data2.val();
        console.log(farms);
        console.log(farms2)
        var keys:any =Object.keys(farms2)


        this.farmArray.length = 0;
        console.log(keys);
        for(var i =0 ; i <keys.length;i++){
          var  k =keys[i];
          var y  = 'UrbanFarmz/' + k;
          var FarmDetails;
          firebase.database().ref(y).on('value', (data3:any)=>{
            FarmDetails = data3.val();
            console.log(FarmDetails);
            
            var keys3 = Object.keys(FarmDetails)
            console.log(keys3)
             for(var a = 0;a < keys3.length;a++){
               var k3 = keys3[a];
               console.log(k3)
               let obj = {
                     
                k:k3 ,
                lat:FarmDetails[k3].lat ,
                lng:FarmDetails[k3].lng ,
                name: FarmDetails[k3].name ,
                description:FarmDetails[k3].description ,
                type:FarmDetails[k3].type ,
                address: FarmDetails[k3].address ,
                aquatic: FarmDetails[k3].aquatic ,
                crops:FarmDetails[k3].crops ,
                tel:FarmDetails[k3].tel ,
                email: FarmDetails[k3].email ,
                image:FarmDetails[k3].image ,
                beeKeeping:FarmDetails[k3].beeKeeping ,
                liveStock:FarmDetails[k3].liveStock ,
                facebook:FarmDetails[k3].facebook,
                products:FarmDetails[k3].products,
                farmRate: FarmDetails[k3].farmRate
              }
              this.farmArray.push(obj)
              console.log(this.farmArray)
             }
          })
            console.log(FarmDetails)
             
          
          
           ;
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

     firebase.database().ref('UrbanFarmz/'+uid).on('value',(data:any)=>{

       var farms =data.val() ;
       console.log(farms);
       var keys:any =Object.keys(farms)
       console.log(keys);
       this.farmArray =[]
       for(var i =0 ; i <keys.length; i++){
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
           facebook:farms[k].facebook,
           website:farms[k].website
         }
         this.farmArray.push(obj) ;
         resolve(this.farmArray)
       }

     })

   })


}


getAFarm(key){
  let uid: any = firebase.auth().currentUser.uid;
   console.log(uid);
   return new Promise((resolve ,reject)=>{
    firebase.database().ref('UrbanFarmz/'+uid+'/'+key).on('value',(data:any)=>{
      var farm = data.val() ;
      console.log(farm);
      resolve(farm)
    })
    })
    
  }
  

  loginx(email , password){
    return firebase.auth().signInWithEmailAndPassword(email, password) ;
  }
fgdf(){
  Swal.fire({
    title: 'Submit your Github username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
  })

  
}

getFarmView(){
  
  return new Promise ((resolve, reject) =>{

    console.log("getFarmView Active");
    this.getallFarms().then((data:any)=>{
      for (let index = 0; index < data.length; index++) {
        const element = data[index].k;
        firebase.database().ref("FarmViews/"+element).on('value' , (data:any)=>{
          var FarmViews =data.val();
          console.log(FarmViews);
          var views = 0
          console.log("outside if statement provider");
          
          if(FarmViews == null || FarmViews == undefined){
            console.log("content null or undefined");
            
            views += 0
          }else if(FarmViews != null){
            
            var keys: any = Object.keys(FarmViews);
            for (let index = 0; index < keys.length; index++) {
              var v = keys[index];
              console.log("content has views");
              console.log(keys[index]);
             
              const element = FarmViews[v].view;
              console.log(element);
              
              views += element
            }
          }
          console.log("views");
          console.log(views);
          this.viewsArr.push(views)
      
          
        })
       
      }
    })
  
    
    resolve(this.viewsArr)
  })
   
 }

}
