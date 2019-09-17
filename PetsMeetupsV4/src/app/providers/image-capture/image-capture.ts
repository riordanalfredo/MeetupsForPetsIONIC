import { Injectable } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';

/*
  Generated class for the ImageCaptureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageCaptureProvider {

  constructor(
    private camera: Camera,
    private alertCtrl: AlertController) {
    console.log('Hello ImageCaptureProvider Provider');
  }

  async getPhoto(): Promise<any> {
    return new Promise<any>(resolve => {
      let image: any = 'assets/imgs/default_pet_img.png';

      this.alertCtrl.create({
        message: 'Pick a source for your image',
        buttons: [
          {
            text: 'Camera',
            handler: () => {
              this.getPicture(PictureSourceType.CAMERA)
                .then(imageData => {
                  image = this.dataToImage(imageData);
                  resolve(image);
                }).catch(reason => console.log(reason));
            }
          },
          {
            text: 'Gallery',
            handler: () => {
              this.getPicture(PictureSourceType.SAVEDPHOTOALBUM)
                .then(imageData => {
                  image = this.dataToImage(imageData);
                  resolve(image);
                }).catch(reason => console.log(reason));
            }
          }
        ]
      }).then(alert => alert.present());
    });
  }

  private dataToImage(imageData: any) {
    return 'data:image/jpg;base64,' + imageData;
  }

  private async getPicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    };

    return await this.camera.getPicture(options);
  }

}
