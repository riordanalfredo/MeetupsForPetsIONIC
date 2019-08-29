import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the YourPetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-your-pets',
  templateUrl: 'your-pets.html',
})
export class YourPetsPage {

  allPetsArray = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: DbProvider, private afAuth: AuthProvider) {

    this.afAuth.getUser().then(user =>{
      this.afDatabase.getPets(user.getUserId()).then(petList => {
        let pets = [];
        petList.forEach(pet => {
          pets.push(pet);
        })
        this.allPetsArray = pets;
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YourPetsPage');
  }

}
