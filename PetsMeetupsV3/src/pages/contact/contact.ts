import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Injectable()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private contacts: Contacts) {

      let contact: Contact = this.contacts.create();
      contact.name = new ContactName(null, 'Smith', 'John');
      contact.phoneNumbers = [ new ContactField('mobile', '6471234567') ];
      contact.save().then(
        () => console.log('Contact saved!', contact),
        (error: any) => console.error('Error saving contact.', error)
      );
    }

  ionViewDidLoad() {    
    console.log('ionViewDidLoad ContactPage');
  }
  

}
