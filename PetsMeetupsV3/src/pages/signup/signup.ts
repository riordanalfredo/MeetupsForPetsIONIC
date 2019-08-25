import { Component } from '@angular/core';
import { IonicPage, ViewController, ToastController } from 'ionic-angular';
import { FormGroup, ValidatorFn, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { DbProvider } from '../../providers/db/db';
import { User } from '../../models/User';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  signupError: string;
  showSpinner: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    private authProvider: AuthProvider,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private dbProvider: DbProvider
  ) {
    this.signupForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6), this.equalFields('password')])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
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

  signup() {
    let data = this.signupForm.value;

    this.showSpinner = true;

    this.authProvider.signUpWithEmail(data.email, data.password).then(
      auth => {
        auth.user.updateProfile({ displayName: data.name }).then(() => {
          this.dbProvider.addUser(new User(auth.user.uid, data.name, data.mobile, data.email, '')).then(() => {
            this.toastCtrl.create({
              message: 'Account created successfully. Please log in.',
              duration: 3000
            }).present();

            this.dismissModal();
          });
        })
      },
      error => this.signupError = error.message
    ).finally(() => this.showSpinner = false);
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

}
