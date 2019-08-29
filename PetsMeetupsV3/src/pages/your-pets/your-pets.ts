import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';
import { Pet } from '../../models/Pet';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: DbProvider, private afAuth: AuthProvider, private alertCtrl: AlertController) {

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

  redirectToEditPet(pet: Pet){
    this.navCtrl.push('EditPetPage', {pet: pet});
  }

  deletePet(pet: Pet){

    let alert = this.alertCtrl.create({
      title: 'Deleting Pet',
      message: 'Are you sure you want to remove this pet?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log(pet);
            console.log('Pet deleted');
          }
        }
      ]
    });
    alert.present();


  }
}
