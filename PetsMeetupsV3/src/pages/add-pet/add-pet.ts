import { Component } from '@angular/core';
import { Pet } from '../../models/Pet'
import { IonicPage, NavController, NavParams, ToastController, ViewController, AlertController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { ImageCaptureProvider } from '../../providers/image-capture/image-capture';

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
  petName: string;
  petDesc: string;
  defaultPetImage: string = 'assets/imgs/default_pet_img.png';
  image: any;
  showSpinner: boolean = false;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private afDatabase: DbProvider,
    private toastCtrl: ToastController,
    private imageCapture: ImageCaptureProvider) {
    this.image = this.defaultPetImage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addPhoto() {
    this.imageCapture.getPhoto().then(image => this.image = image);
  }

  addPet() {
    this.showSpinner = true;
    const pet: Pet = new Pet('', this.petName, this.petDesc, '');

    if (this.image == this.defaultPetImage) {
      pet.setAvatarUrl(this.defaultPetImage);
      this.uploadPet(pet);
    } else {
      let task: AngularFireUploadTask = this.afDatabase.uploadPetImage(this.image);

      task.then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadUrl => {
          pet.setAvatarUrl(downloadUrl);
          this.uploadPet(pet);
        });
      }).catch(reason => {
        this.showSpinner = false;
        console.log(reason);
      });
    }
  }

  uploadPet(pet: Pet) {
    this.afDatabase.addPet(pet).then(() => {
      this.showSpinner = false;
      this.toastCtrl.create({
        message: 'Your pet has been added',
        duration: 2500,
        position: 'bottom'
      }).present().then(() => this.dismiss());
    });
  }
}
