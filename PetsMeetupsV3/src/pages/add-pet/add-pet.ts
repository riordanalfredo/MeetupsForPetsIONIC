import { Component } from '@angular/core';
import { Pet } from '../../models/pet'
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddPetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-pet',
  templateUrl: 'add-pet.html',
})
export class AddPetPage {

  pet = {} as Pet;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetPage');
  }

  registerPet(){
    console.log(this.pet.name);
    console.log(this.pet.description);

    // Clears inputs after pet has been registered
    this.pet.name = '';
    this.pet.description = '';
  }

  redirectToAddPhoto(){
    this.navCtrl.push('AddImagePage');
  }

}
