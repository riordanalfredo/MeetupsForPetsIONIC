import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginError: string;
  showSpinner: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    this.showSpinner = true;

    this.authProvider.signInWithEmail(data.email, data.password)
      .then(
        () => this.successfulLogin(),
        error => this.loginError = error.message
      ).then(() => this.showSpinner = false);
  }

  successfulLogin() {
    this.toastCtrl.create({
      message: 'Log in successful!',
      duration: 3000
    }).present();

    this.navCtrl.popToRoot();
    this.viewCtrl.dismiss();
  }

  showSignup() {
    const modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

}
