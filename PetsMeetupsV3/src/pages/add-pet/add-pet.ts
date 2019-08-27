import { Component } from '@angular/core';
import { Pet } from '../../models/Pet'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageUploadService } from '../../services/image_upload_service';
import { Toast } from '@ionic-native/toast';
import { Subscription } from 'rxjs';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';

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
  petName:string;
  petDesc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imgUploadService: ImageUploadService,
    private afDatabase: DbProvider, private toast: Toast, private authService: AuthProvider) {
    this.subscription = this.imgUploadService.getImgURL().subscribe(imgURL => this.imgURL = imgURL);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetPage');
  }

  redirectToAddPhoto(){
    this.navCtrl.push('AddImagePage');
  }


  registerPet(){

    // Creates a new Pet
    let newPet = new Pet(Math.round(Math.random()*1000000).toString(), this.petName, this.petDesc, this.imgURL);

    // Retrieves the user's ID and uploads pet to the database
    this.authService.getUser().then(user =>{
      this.afDatabase.addPet(user.getUserId(), newPet);

      // Clears inputs after pet has been registered
      this.petDesc = "";
      this.petName = "";
      this.imgURL = "assets/imgs/default_pet_img.png";

    })



    this.toast.show(`Your pet has been added`, '2500', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );

  }





}
