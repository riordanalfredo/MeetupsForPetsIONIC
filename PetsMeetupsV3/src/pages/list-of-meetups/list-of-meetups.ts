import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { EventPage } from '../event/event';
import { DbProvider } from '../../providers/db/db';
import { Pet } from '../../models/pet';
import { User } from '../../models/User';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the ListOfMeetupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-of-meetups',
  templateUrl: 'list-of-meetups.html',
})
export class ListOfMeetupsPage {

  petsData : Array<Pet>;
  usersData : Array<User>;
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private db: DbProvider,) {
      this.db.getAllPets().then(array => {
        this.petsData = array;
        console.log(this.petsData);
      });
    }

  fakeData = [
    { 
      petName: 'Dogo',
      petPhoto: 'assets/img/dummy-profile-pic.png',
      petDetails: 'Chihuahua, 12 years old',
      mainPhoto: 'assets/img/dog.jpg',
      locationDescription: 'Amazing street, Avenue Street, MELBOURNE, VIC, 3000',
      contact: '',
    },
    { 
      petName: 'Froggy',
      petPhoto: 'assets/img/dummy-profile-pic.png',
      petDetails: 'Chihuahua, 1 year old',
      mainPhoto: 'assets/img/dog.jpg',
      locationDescription: 'Amazing street, Avenue Street, MELBOURNE, VIC, 3000',
      contact: '',
    },
    { 
      petName: 'Shibahuahhahaha',
      petPhoto: 'assets/img/dummy-profile-pic.png',
      petDetails: 'Inu, 15 years old',
      mainPhoto: 'assets/img/dog.jpg',
      locationDescription: 'Amazing street, Avenue Street, MELBOURNE, VIC, 3000',
      contact: '',
    },
  ];

  openPage(type) {
    let page;
    switch (type){
      case 'contact': {
        page = MessagePage;
        break;
      }
      case 'meetup':{
        page = EventPage;
        break;
      }
      default:{
        console.log('Default page');
        break;
      }
    }
    this.navCtrl.push(page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOfMeetupsPage');
  }

}
