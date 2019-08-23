import { Component } from '@angular/core';
import { Pet } from '../../models/pet'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageUploadService } from '../../services/image_upload_service';
import { Subscription } from 'rxjs';

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

  imgURL: string;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imgUploadService: ImageUploadService) {
    this.subscription = this.imgUploadService.getImgURL().subscribe(imgURL => this.imgURL = imgURL);
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
