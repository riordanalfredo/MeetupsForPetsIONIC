import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Pet } from '../../models/Pet';
import { AddPetPage } from '../add-pet/add-pet';
import { EditPetPage } from '../edit-pet/edit-pet';

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

  constructor(
    public navParams: NavParams,
    private afDatabase: DbProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) {
    this.getPets();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YourPetsPage');
  }

  redirectToEditPet(pet: Pet) {
    // Passes the current pet to be edited to the next page
    this.modalCtrl.create(EditPetPage, { pet: pet }).present();
  }

  getPets() {
    this.afDatabase.getPets().then(petList => {
      let pets = [];
      petList.forEach(pet => {
        pets.push(pet);
      })
      this.allPetsArray = pets;
    });
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
            this.afDatabase.deletePet(pet).then(() => {
              // Removes the pet from the front-end
              this.allPetsArray = this.allPetsArray.filter(item => item.id != pet.getId());
            });
          }
        }
      ]
    });
    alert.present();
  }
}
