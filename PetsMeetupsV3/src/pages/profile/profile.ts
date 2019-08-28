import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/User';
import { EditDetailsPage } from '../edit-details/edit-details';
import { EditPasswordPage } from '../edit-password/edit-password';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;

  constructor(
    private authProvider: AuthProvider,
    private modalCtrl: ModalController
  ) {
    authProvider.getUser().then(user => this.user = user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout() {
    this.authProvider.signOut();
  }

  editDetails() {
    const modal = this.modalCtrl.create(EditDetailsPage);
    modal.present();
    modal.onDidDismiss(() => {
      this.authProvider.getUser().then(user => {
        this.user = user;
      });
    });
  }

  changePassword() {
    this.modalCtrl.create(EditPasswordPage).present();
  }

}
