import { Component } from '@angular/core';
import { Pet } from '../../models/pet'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageUploadService } from '../../services/image_upload_service';
import { AngularFireDatabase } from '@angular/fire/database';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private imgUploadService: ImageUploadService,
    private afDatabase: AngularFireDatabase) {
    this.subscription = this.imgUploadService.getImgURL().subscribe(imgURL => this.imgURL = imgURL);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetPage');
  }

  redirectToAddPhoto(){
    this.navCtrl.push('AddImagePage');
  }


  registerPet(){
    // Saves the url used to display the avatar of the pet
    this.pet.avatar_url = this.imgURL;

    // Uploads data to firebase
    // TODO: Replace with ID from user that has logged in
    this.afDatabase.list(`users/user_id_1/pets`).push(this.pet).then(() => {console.log('Pet added')});

    // Clears inputs after pet has been registered
    this.pet.name = '';
    this.pet.description = '';
    this.imgURL = "assets/imgs/default_pet_img.png";
  }


}
