import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
  title: string;
  location: string;
  notes: string;
  startDate;
  endDate;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar
  ) {
    this.title = 'Pet Meetup';
    this.location = 'The Fire Nation';
    this.notes = 'Bring Zuzu';
    this.startDate = new Date().toISOString();
    this.endDate = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  createEvent() {
    this.calendar
      .createEvent(
        this.title,
        this.location,
        this.notes,
        new Date(this.startDate),
        new Date(this.endDate)
      )
      .then(msg => console.log(msg), err => console.log(err));
  }
}
