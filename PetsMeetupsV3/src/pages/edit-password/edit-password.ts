import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EditPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {

  editForm: FormGroup;
  editError: string;
  showSpinner: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController
  ) {
    this.editForm = formBuilder.group({
      old_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      new_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_new_password: ['', Validators.compose([Validators.required, Validators.minLength(6), this.equalFields('new_password')])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPasswordPage');
  }

  equalFields(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      let isValid = control.root.value[field_name] == input;

      if (!isValid) {
        return { 'mismatch': { isValid } };
      } else {
        return null;
      }
    };
  }

  updatePassword() {
    let data = this.editForm.value;

    this.showSpinner = true;

    // Get the current user
    this.authProvider.getUser().then(user => {
      // Reauthenticate to change password
      this.authProvider.signInWithEmail(user.getEmail(), data.old_password).then(user => {
        // Update the password
        this.authProvider.updatePassword(data.new_password).then(() => {
          this.showSpinner = false;

          this.toastCtrl.create({
            message: 'Password updated successfully.',
            duration: 3000
          }).present();
  
          this.dismiss();
        }).catch(reason => this.showError(reason));
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
