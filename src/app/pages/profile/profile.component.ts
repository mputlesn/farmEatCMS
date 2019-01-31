import { Component, OnInit } from '@angular/core';
import { FarmEatService } from '../../providers/farm-eat.service';
import { Router } from '@angular/router';

declare var firebase;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileArray = [] ;
  coverUrl ;
  propicUrl;
  urlCover;
  urlPropic;

  constructor(private farmEAtDb: FarmEatService, private router: Router) { 

    
  //  this.farmEAtDb.getProfile().then((data:any)=>{
  //      console.log(data);
  //      this.profileArray =data ;


      
  //    })


  }

  ngOnInit() {
    this.farmEAtDb.getUser().then((data:any)=>{
      console.log(data);
      
      // this.username = data.username
      // this.email = data.email
      this.coverUrl = data.cover
      this.propicUrl = data.proPicture
      console.log(this.coverUrl);
      console.log(this.propicUrl);
    })
  }

  nextpageupdate(){
    this.router.navigateByUrl('/updatepage');

  }

  uploadCover(event: any){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.urlCover = event.target.files[0];
      reader.onload = (event: any) => {
        this.coverUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      let selectedfile = event.target.files[0];
      let filename = selectedfile.name;
     
    
 
      let storageRef = firebase.storage().ref("cover/" + filename);
 
      let metadata = { contentType: "image/jpeg", size: 0.75 };
      let uploadTask = storageRef.put(selectedfile, metadata);
 
     
      uploadTask.on(
        "state_changed",
        function(snapshot) {},
        function(error) {
          // Handle unsuccessful uploads
          alert(error);
        },
        function () {
          // Handle successful uploads on complete
 
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log("User has sign in");
                let userID = firebase.auth().currentUser.uid;
                let obj = {
                  cover: downloadURL
                };
 
                firebase
                  .database()
                  .ref("admins/" + userID)
                  .update({
                    cover: downloadURL
                  },(error)=>{
                    if (error) {
                      // The write failed...
                      // const toast = this.toastCtrl.create({
                      //   message: 'Your cover picture was not added successfully, please try again.',
                      //   duration: 3000
                      // });
                      // toast.present();
                    } else {
                      // Data saved successfully!
                      
                      // const toast = this.toastCtrl.create({
                      //   message: 'Your cover picture was added successfully',
                      //   duration: 3000
                      // });
                      // toast.present();
                    }
                  });
 
                  
              } else {
                console.log("User has not sign in");
              }
            });
            
          });
        }
      );
 
      }
  }

  uploadProPic(event: any){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.urlCover = event.target.files[0];
      reader.onload = (event: any) => {
        this.propicUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      let selectedfile = event.target.files[0];
      let filename = selectedfile.name;
     
    
 
      let storageRef = firebase.storage().ref("cover/" + filename);
 
      let metadata = { contentType: "image/jpeg", size: 0.75 };
      let uploadTask = storageRef.put(selectedfile, metadata);
 
     
      uploadTask.on(
        "state_changed",
        function(snapshot) {},
        function(error) {
          // Handle unsuccessful uploads
          alert(error);
        },
        function () {
          // Handle successful uploads on complete
 
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log("User has sign in");
                let userID = firebase.auth().currentUser.uid;
                let obj = {
                  cover: downloadURL
                };
 
                firebase
                  .database()
                  .ref("admins/" + userID)
                  .update({
                    proPicture: downloadURL
                  },(error)=>{
                    if (error) {
                      // The write failed...
                      // const toast = this.toastCtrl.create({
                      //   message: 'Your cover picture was not added successfully, please try again.',
                      //   duration: 3000
                      // });
                      // toast.present();
                    } else {
                      // Data saved successfully!
                      
                      // const toast = this.toastCtrl.create({
                      //   message: 'Your cover picture was added successfully',
                      //   duration: 3000
                      // });
                      // toast.present();
                    }
                  });
 
                  
              } else {
                console.log("User has not sign in");
              }
            });
            
          });
        }
      );
 
      }
  }

}
