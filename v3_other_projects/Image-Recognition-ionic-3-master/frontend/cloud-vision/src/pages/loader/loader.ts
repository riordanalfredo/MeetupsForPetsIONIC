import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-loader',
  templateUrl: 'loader.html',
})
export class LoaderPage {

  public lottieLoader : Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.lottieLoader = {
      path: 'assets/lottie/articulation.json',
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
  }
  
  ionViewWillLeave(){
    this.anim.stop();
  }

  

}
