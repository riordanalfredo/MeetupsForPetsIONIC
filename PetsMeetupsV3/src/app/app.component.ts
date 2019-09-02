import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListOfMeetupsPage } from '../pages/list-of-meetups/list-of-meetups';
import { EventPage } from '../pages/event/event';
import { HistoryPage } from '../pages/history/history';
import { MessagePage } from '../pages/message/message';
import { ContactPage } from '../pages/contact/contact';
import { AddPetPage } from '../pages/add-pet/add-pet'
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string; component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authProvider: AuthProvider,
    private modalCtrl: ModalController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List of Meetups', component: ListOfMeetupsPage },
      { title: 'Event', component: EventPage },
      { title: 'History', component: HistoryPage },
      { title: 'Messages', component: MessagePage },
      { title: 'Add Pet', component: AddPetPage},
      { title: 'Profile', component: ProfilePage },
      { title: 'Contacts', component: ContactPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.authProvider.angularFireAuth.authState.subscribe(user => {
      if (!user) {
        this.modalCtrl.create(LoginPage).present();
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
