import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';
import { Pet } from '../../models/Pet';
import { AddPetPage } from '../add-pet/add-pet';

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
  userId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: DbProvider,
    private afAuth: AuthProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) {
    this.getPets();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YourPetsPage');
  }

  redirectToEditPet(pet: Pet) {
    // Passes the current pet to be edited to the next page
    this.navCtrl.push('EditPetPage', { pet: pet });
  }

  getPets() {
    this.afAuth.getUser().then(user => {
      this.afDatabase.getPets(user.getUserId()).then(petList => {
        let pets = [];
        petList.forEach(pet => {
          pets.push(pet);
        })
        this.allPetsArray = pets;
        this.userId = user.getUserId();
      })
    })
  }

  addPet() {
    const modal = this.modalCtrl.create(AddPetPage);
    modal.present();
    modal.onDidDismiss(() => this.getPets());
  }

  deletePet(pet: Pet) {
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

            // Removes the pet from the database
            this.afDatabase.deletePet(this.userId, pet);

            // Removes the pet from the front-end
            this.allPetsArray = this.allPetsArray.filter(item => item.id != pet.getId());
          }
        }
      ]
    });
    alert.present();
  }
}
