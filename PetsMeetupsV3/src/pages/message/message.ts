import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SMS } from '@ionic-native/sms';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  phoneNumber: string;
  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sms: SMS) {
    this.phoneNumber = this.navParams.get('phone');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  sendMessage() {
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT' // Opens Default sms app
        //intent: '' // Sends sms without opening default sms app
      }
    };
    this.sms.send(this.phoneNumber, this.message, options);
  }
}
