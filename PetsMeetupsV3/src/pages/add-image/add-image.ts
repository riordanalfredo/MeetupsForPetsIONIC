import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImageUploadService } from "../../services/image_upload_service";
import { Subscription, Observable } from "rxjs";
import { Toast } from '@ionic-native/toast';
import firebase from "firebase";
/**
 * Generated class for the AddImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-add-image",
  templateUrl: "add-image.html"
})
export class AddImagePage {
  myPhoto: any;
  picData: any;
  imgURL: string;
  imageUrl: string;
  myPicRef: any;
  downloadURL: Observable<any>;
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private imgUploadService: ImageUploadService,
    private toast: Toast
  ) {
    this.subscription = this.imgUploadService
      .getImgURL()
      .subscribe(imgURL => (this.imgURL = imgURL));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddImagePage");
  }

  takePhoto(sourceType) {
    // SourceType=0 is for the photo library and SourceType=1 is for the camera
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        this.picData = imageData;
        this.uploadImage(this.imgUploadService);
        this.myPhoto = "data:image/jpeg;base64," + imageData;
      },
      err => {
        console.error(err);
      }
    );

  }

  uploadImage(service: ImageUploadService) {
    this.myPicRef = firebase.storage().ref("/");

    // Completes upload of image
    var uploadTask = this.myPicRef
      .child(this.uid())
      .child("pic.jpeg")
      .putString(this.picData, "base64", { contentType: "image/jpeg" });


      // Retrieves URL from Firebase
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          service.updateImgURL(downloadURL);
        });
      }
    );

    // Moves to previous page with image once finished
    this.navCtrl.pop();

    this.toast.show(`Avatar has been set`, '2500', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );

  }

  uid() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx".replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
}
