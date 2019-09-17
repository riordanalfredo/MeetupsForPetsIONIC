import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController } from '@ionic/angular';
import { DbProvider } from '../providers/db/db';

@Component({
  selector: 'app-your-pets',
  templateUrl: './your-pets.page.html',
  styleUrls: ['./your-pets.page.scss'],
})
export class YourPetsPage implements OnInit {

  allPetsArray = [];

  constructor(
    private afDatabase: DbProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) { 
      this.getPets();
    }

  ngOnInit() {
    console.log('ionViewDidLoad YourPetsPage');
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

  /*
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
  */
}
