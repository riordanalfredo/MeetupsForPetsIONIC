import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ScheduleMeetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule-meetup',
  templateUrl: 'schedule-meetup.html'
})
export class ScheduleMeetupPage {
  pet: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pet = this.navParams.get('pet');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleMeetupPage');
  }
}
