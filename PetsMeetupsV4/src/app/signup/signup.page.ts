import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DbService } from '../db.service';
import { ToastController, ModalController } from '@ionic/angular';
import { User } from 'src/models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  signupError: string;
  showSpinner: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private authProvider: AuthService,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private dbProvider: DbService
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6), this.equalFields('password')])]
    });
  }

  ngOnInit() {
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
          this.dbProvider.addUser(new User(auth.user.uid, data.name, data.mobile, data.email, 'assets/imgs/profile-placeholder.png')).then(() => {
            this.toastCtrl.create({
              message: 'Account created successfully. Please log in.',
              duration: 3000
            }).then(toast => toast.present());

            this.dismissModal();
          });
        })
      },
      error => this.signupError = error.message
    ).then(() => this.showSpinner = false);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
