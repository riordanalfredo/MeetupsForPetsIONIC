import { Component } from '@angular/core';
import { Pet } from '../../models/Pet'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageUploadService } from '../../services/image_upload_service';
import { Toast } from '@ionic-native/toast';
import { Subscription } from 'rxjs';
import { DbProvider } from '../../providers/db/db';

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

  imgURL: string;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imgUploadService: ImageUploadService,
    private afDatabase: DbProvider, private toast: Toast) {
    this.subscription = this.imgUploadService.getImgURL().subscribe(imgURL => this.imgURL = imgURL);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetPage');
  }

  redirectToAddPhoto(){
    this.navCtrl.push('AddImagePage');
  }


  registerPet(event:any){

    // Creates a new Pet
    let newPet = new Pet(Math.round(Math.random()*1000000).toString(), event.target.petName.value, event.target.petDescription.value, this.imgURL);

    // TODO: Uploads data to firebase using the service

    // Clears inputs after pet has been registered
    event.target.petName.value = '';
    event.target.petDescription.value = '';
    this.imgURL = "assets/imgs/default_pet_img.png";

    /*
    this.toast.show(`Your pet has been added`, '2500', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
    */
  }





}
