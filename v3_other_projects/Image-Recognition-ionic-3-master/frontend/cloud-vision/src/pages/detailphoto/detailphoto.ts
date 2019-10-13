import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LikePage } from '../like/like';

@IonicPage()
@Component({
  selector: 'page-detailphoto',
  templateUrl: 'detailphoto.html',
})
export class DetailphotoPage {

  details:any;
  web_Entities :any;
  visually_Similar_Images:any;
  img:any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.details = this.navParams.get('data');
    this.web_Entities = this.details[0].web_Entities;
    this.visually_Similar_Images = this.details[0].visually_Similar_Images;
  }

  like(){
    const like = this.modalCtrl.create(LikePage);
    like.present(); 
    setTimeout(() => {
      like.dismiss(); 
    }, 1100);
  }

}
