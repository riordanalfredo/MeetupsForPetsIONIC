import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Calendar } from '@ionic-native/calendar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private calendar: Calendar) {

  }

  createEvent() {
    this.calendar.createEvent('Pet Meetup', 'My place', 'Bring pets', new Date(), new Date())
      .then(msg => console.log(msg), err => console.log(err));
  }
}
