import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var firebase ;
@Injectable({
  providedIn: 'root'
})
export class FarmEatService {

  constructor(public http: HttpClient) { }

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
