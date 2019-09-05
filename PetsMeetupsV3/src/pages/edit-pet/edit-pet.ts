import { Component } from "@angular/core";
import {
  IonicPage,
  NavParams,
  ToastController,
  ViewController
} from "ionic-angular";
import { Pet } from "../../models/Pet";
import { Subscription } from "rxjs";
import { DbProvider } from "../../providers/db/db";
import { ImageCaptureProvider } from "../../providers/image-capture/image-capture";

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
  name: string;
  desc: string;
  pet: Pet;
  subscription: Subscription;
  image: any;
  imageAltered: boolean = false;
  showSpinner: boolean = false;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private afDatabase: DbProvider,
    private imageCapture: ImageCaptureProvider
  ) {
    this.pet = this.navParams.get('pet');
    this.image = this.pet.getAvatarUrl();
    this.name = this.pet.getName();
    this.desc = this.pet.getDescription();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditPetPage");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  changePhoto() {
    this.imageCapture.getPhoto().then(image => {
      this.image = image;
      this.imageAltered = true;
    });
  }

  update() {
    this.showSpinner = true;
    this.pet.setName(this.name);
    this.pet.setDescription(this.desc);
    
    if (this.imageAltered === true) {
      // Delete previous image
      this.afDatabase.deletePetImage(this.pet).then(() => {
        // Upload new image
        this.afDatabase.uploadPetImage(this.image).then(uploadTask => {
          // Get the download url
          uploadTask.ref.getDownloadURL().then(downloadUrl => {
            this.pet.setAvatarUrl(downloadUrl);
            this.updatePetDetails(this.pet);
          });
        });
      });
    } else {
      this.updatePetDetails(this.pet);
    }
  }

  updatePetDetails(pet: Pet) {
    this.afDatabase.updatePetDetails(pet).then(() => {
      this.showSpinner = false;
      this.toastCtrl.create({
        message: "Your pet details has been updated",
        duration: 2500,
        position: "bottom"
      }).present();
      this.dismiss();
    });
  }
}
