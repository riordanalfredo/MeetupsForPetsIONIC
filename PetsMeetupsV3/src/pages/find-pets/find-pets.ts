import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { MessagePage } from '../message/message';
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
  loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DbProvider,
  ) {
    this.loading = true;
  }

  async getPets() {
    const data = await this.database.getAllPets();
    this.loading = false;
    return data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPetsPage');
    this.pets = this.getPets();    
  }

  meetup(pet) {
    this.navCtrl.push(ScheduleMeetupPage, {
      pet: pet
    });
  }

  contactOwner(pet) {    
    this.navCtrl.push(MessagePage, {
      phone: pet[0]
    });
  }
}
