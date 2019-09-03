import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

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
  title: string;
  location: string;
  notes: string;
  date: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sms: SMS) {
    this.pet = this.navParams.get('pet');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleMeetupPage');
  }

  sendMessage() {
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT' // Opens Default sms app
        //intent: '' // Sends sms without opening default sms app
      }
    };
    const message =
      'Meetup with ' +
      this.pet[1].name +
      '\n' +
      this.title +
      '\n' +
      this.location +
      '\n' +
      this.notes +
      '\n' +
      this.date;
    this.sms.send(this.pet[0], message, options);
  }
}
