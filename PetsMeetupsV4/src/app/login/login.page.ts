import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loginError: string;
  showSpinner: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private authProvider: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
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
    }).then(toast => toast.present());

    this.modalCtrl.dismiss();
  }

  showSignup() {
    this.modalCtrl.create({
      component: SignupPage
    }).then(modal => modal.present());
  }

}
