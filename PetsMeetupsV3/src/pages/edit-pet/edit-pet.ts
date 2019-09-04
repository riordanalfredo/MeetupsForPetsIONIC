import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { Pet } from "../../models/Pet";
import { ImageUploadService } from "../../services/image_upload_service";
import { Subscription } from "rxjs";
import { DbProvider } from "../../providers/db/db";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the EditPetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-pet",
  templateUrl: "edit-pet.html"
})
export class EditPetPage {
  pet: any;
  subscription: Subscription;
  imgURL: any;
  imageAltered: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imgUploadService: ImageUploadService,
    private toastCtrl: ToastController,
    private afDatabase: DbProvider,
    private afAuth: AuthProvider
  ) {
    this.pet = this.navParams.get("pet");
    this.subscription = this.imgUploadService
    .getImgURL()
    .subscribe(imgURL => (this.imgURL = imgURL));

    this.imgURL = this.pet.avatarUrl;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditPetPage");
  }

  ionViewDidEnter() {
  }

  onUpdate(event: any, pet: Pet) {
    // Update details of pet
    this.pet.name = event.target.name.value;
    this.pet.description = event.target.desc.value;

    // Check to see if the image uploaded is a new one
    if (this.pet.avatarUrl !== this.imgURL &&
      this.imgURL !== "assets/imgs/default_pet_img.png"
    ) {
      this.pet.avatarUrl = this.imgURL;
    }

    // Updates the details of the pet
    this.afAuth.getUser().then(user => {
      this.afDatabase.updatePetDetails(user.getUserId(), pet[0]);
    });

    this.navCtrl.pop();

    this.toastCtrl
      .create({
        message: "Your pet details has been updated",
        duration: 2500,
        position: "bottom"
      })
      .present();
  }

  redirectUploadImage() {
    this.navCtrl.push("AddImagePage");
  }
}
