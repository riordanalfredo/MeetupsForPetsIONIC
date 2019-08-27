import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Observable } from 'rxjs';
import { ScheduleMeetupPage } from '../schedule-meetup/schedule-meetup';

/**
 * Generated class for the FindPetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-pets',
  templateUrl: 'find-pets.html'
})
export class FindPetsPage {
  pets: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DbProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPetsPage');
    this.pets = this.getPets();
    console.log(this.pets);
  }

  async getPets() {
    const data = await this.database.getAllPets();
    return data;
  }

  meetup(pet) {
    this.navCtrl.push(ScheduleMeetupPage, {
      pet: pet
    });
  }
}
