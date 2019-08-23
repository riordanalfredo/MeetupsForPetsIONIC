import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageUploadService } from '../../services/image_upload_service';
import { Subscription } from 'rxjs';

/**
 * Generated class for the AddImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-image',
  templateUrl: 'add-image.html',
})
export class AddImagePage {

  myPhoto:any;
  picData:any;
  imgURL: string;

  subscription: Subscription;


  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private imgUploadService: ImageUploadService) {
    this.subscription = this.imgUploadService.getImgURL().subscribe(imgURL => (this.imgURL = imgURL));
    console.log(this.imgURL);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddImagePage');
  }

  takePhoto(sourceType){

    // SourceType=0 is for the photo library and SourceType=1 is for the camera
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     this.picData = imageData;
     this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     console.error(err);
    });

    console.log("Added photo");

    // TODO: Sets it to the URL of the uploaded photo from Firebase
    this.imgURL = "New value";
    this.imgUploadService.updateImgURL(this.imgURL);
  }


}
