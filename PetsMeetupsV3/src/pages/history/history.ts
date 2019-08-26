import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  fakeData = [
    { 
      eventInfo: 'Meeting with amazing Cootie',
      petDetails: 'Doggo, 15 years old, Chihuahua',
      mainPhoto: 'assets/img/dog.jpg',
      locationDesc : 'Location is here',
      date: '13 December 2017' // should be in date format
    },
    { 
      eventInfo: 'Meeting with amazing Cootie Pie',
      petDetails: 'Doggo, 11 years old, Chihuahua',
      mainPhoto: 'assets/img/dog.jpg',
      locationDesc : 'Location is here',
      date: '15 December 2017' // should be in date format
    },
    { 
      eventInfo: 'Meeting with amazing Cootie HUEUHAHUHA',
      petDetails: 'Doggo, 12 years old, Chihuahua',
      mainPhoto: 'assets/img/dog.jpg',
      locationDesc : 'Location is here',
      date: '20 December 2017' // should be in date format
    },
  ];


  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
