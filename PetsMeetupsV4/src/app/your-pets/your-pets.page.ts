import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController } from '@ionic/angular';
import { DbProvider } from '../providers/db/db';
import { AddPetPage } from '../add-pet/add-pet.page';
import { Pet } from 'src/models/Pet';

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

  
  async addPet() {
    const modal = await this.modalCtrl.create({component: AddPetPage });
    modal.present();
    modal.onDidDismiss().then(() => this.getPets());
  }

  async deletePet(pet: Pet) {
    let alert = await this.alertCtrl.create({
      header: 'Deleting Pet',
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
