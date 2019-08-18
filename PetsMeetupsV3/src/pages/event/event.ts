import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    private calendar: Calendar,
    private toastController: ToastController
  ) {
    let timeZoneOffset = new Date().getTimezoneOffset() * 60000;

    this.title = 'Pet Meetup';
    this.location = 'The Fire Nation';
    this.notes = 'Bring Zuzu';
    this.startDate = new Date(Date.now() - timeZoneOffset).toISOString();
    this.endDate = new Date(Date.now() - timeZoneOffset).toISOString();
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
      .then(
        msg => this.presentToast('Event saved to Calendar!'),
        err => this.presentToast('Oops! Something went wrong!')
      );
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }
}
