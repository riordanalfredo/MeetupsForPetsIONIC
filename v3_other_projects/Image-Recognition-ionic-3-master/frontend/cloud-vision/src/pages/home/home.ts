import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DomSanitizer } from '@angular/platform-browser';
import { DetailphotoPage } from '../detailphoto/detailphoto';
import { LoaderPage } from '../loader/loader';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lottieCamera : Object;
  private anim: any;
  private animationSpeed: number = 1;
  presentToast:any;
  arr: any ;
  loader:any;

  constructor(public navCtrl: NavController,private camera: Camera,private file: File, private transfer: FileTransfer,public loadingCtrl: LoadingController, public modalCtrl: ModalController,private sanitizer: DomSanitizer) {

    this.lottieCamera = {
      path: 'assets/lottie/camera.json',
      renderer: 'canvas',
      autoplay: false,
      loop: true
    };
  
  }

  ionViewWillEnter(){
    this.anim.play();
  }
   
  handleAnimation(anim: any) {
    this.anim = anim;
    this.anim.setSpeed(1.5);
  }

  takePhoto(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      cameraDirection: this.camera.Direction.FRONT,
      targetWidth: 1080,
      targetHeight: 900,
      correctOrientation: true,
      allowEdit: true

    }

    this.camera.getPicture(options).then((imageData) => {

      this.savephoto(imageData);
      
     }, (err) => {
        console.log(err);

  
     });
  }

  savephoto(img) {

    this.loader = this.modalCtrl.create(LoaderPage);

    this.loader.present(); 

    const fileTransfer: FileTransferObject = this.transfer.create();

    var val = Math.floor(1000 + Math.random() * 9000).toString();

    var path = null;
  
    path = this.file.externalCacheDirectory;
  
        fileTransfer.download(img, path + `${val}_pic.png`).then((entry) => {

            this.uploadPhoto(entry.toURL());  
         
        }, (error) => {
            console.log(error);
            this.loader.dismiss(); 
        });

  }

  uploadPhoto(img) {
    
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: 'photo',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(img, 'http://192.168.1.66:8081/api', options).then( data => {

      this.show(data ,img);

    }, (err) => {
      console.log(err);
      this.loader.dismiss(); 
    });

  }

  show(info, img){
    
    this.arr = JSON.parse(info.response);

     setTimeout(() => {

      const detail = this.navCtrl.push(DetailphotoPage, {
        data:this.arr,
        img: img
      });

    this.loader.dismiss();  
      
    }, 1500); 

  }

  ionViewWillLeave(){
    this.anim.stop();
  }

}
