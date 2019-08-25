import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  formGroup: FormGroup;
  petName: AbstractControl;
  ownerName: AbstractControl;
  phoneNumber: AbstractControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private contacts: Contacts,
    private sanitizer: DomSanitizer
  ) {
    this.getContacts();

    this.formGroup = formBuilder.group({
      petName: ['', Validators.required],
      ownerName: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    this.petName = this.formGroup.controls['petName'];
    this.ownerName = this.formGroup.controls['ownerName'];
    this.phoneNumber = this.formGroup.controls['phoneNumber'];
  }

  contactList = [];
  getContacts(): void {
    this.contacts
      .find(['displayName', 'phoneNumbers', 'photos'], { multiple: true, hasPhoneNumber: true })
      .then(contacts => {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i].displayName !== null) {
            var contact = {};
            contact['name'] = contacts[i].displayName;
            contact['number'] = contacts[i].phoneNumbers[0].value;
            if (contacts[i].photos != null) {
              console.log(contacts[i].photos);
              contact['image'] = this.sanitizer.bypassSecurityTrustUrl(contacts[i].photos[0].value);
              console.log(contact);
            } else {
              contact['image'] = 'assets/dummy-profile-pic.png';
            }
            this.contactList.push(contact);
          }
        }
      });
  }

  addContact(): void {
    let contact: Contact = this.contacts.create();
    let ownerName = this.formGroup.value.ownerName;
    let petName = this.formGroup.value.petName;
    contact.name = new ContactName(null, petName.toUpperCase(), `${ownerName}'s pet`);
    let number = new ContactField('mobile', this.formGroup.value.phoneNumber);
    contact.phoneNumbers = [number];
    contact
      .save()
      .then(
        () => console.log('Contact saved!', contact),
        (error: any) => console.error('Error saving contact.', error)
      );
    //refresh after submit
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.getContacts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }
}
