import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/User';

/**
 * Generated class for the EditDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-details',
  templateUrl: 'edit-details.html',
})
export class EditDetailsPage {

  editForm: FormGroup;
  editError: string;
  showSpinner: boolean;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider,
    private dbProvider: DbProvider,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController
  ) {
    this.editForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.showSpinner = true;

    authProvider.getUser().then(user => {
      this.user = user;

      this.editForm.setValue({
        name: user.getName(),
        mobile: user.getMobile(),
        email: user.getEmail(),
        password: ''
      });

      this.showSpinner = false;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDetailsPage');
  }

  updateDetails() {
    let data = this.editForm.value;
    let old_email = this.user.getEmail();

    this.showSpinner = true;

    this.user.setName(data.name);
    this.user.setMobile(data.mobile);
    this.user.setEmail(data.email);

    // Reauthenticate to update email
    this.authProvider.signInWithEmail(old_email, data.password).then(user => {
      // Update details
      this.dbProvider.updateUserDetails(this.user).then(() => {
        this.showSpinner = false;

        this.toastCtrl.create({
          message: 'Details updated successfully.',
          duration: 3000
        }).present();

        this.dismiss();
      }).catch(reason => this.showError(reason));
    }).catch(reason => this.showError(reason));
  }

  showError(message: string) {
    this.editError = message;
    this.showSpinner = false;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
