import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-like',
  templateUrl: 'like.html',
})
export class LikePage {

  public lottieLike : Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,) {

    this.lottieLike = {
      path: 'assets/lottie/like.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };
  }

  ionViewWillEnter(){
    this.anim.play();

    
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }
  
  ionViewWillLeave(){
    this.anim.stop();
  }

}