import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EventPage } from '../pages/event/event';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { ProfilePage } from '../pages/profile/profile';
import { FindPetsPage } from '../pages/find-pets/find-pets';
import { YourPetsPage } from '../pages/your-pets/your-pets';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FindPetsPage;

  pages: Array<{ title: string; component: any, color: any }>;

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
      { title: 'Find Pets', component: FindPetsPage, color:"warning"},
      { title: 'Event', component: EventPage, color:"light"},
      { title: 'Your Pets', component: YourPetsPage, color:"light"},
      { title: 'Profile', component: ProfilePage, color:"light" },
      { title: 'Contacts', component: ContactPage, color:"light"},
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
    page.color='warning';

    for (let p of this.pages) {

      if(p.title==page.title)
      {
        p.color='warning';
      }
      else
      {
        p.color='light';
      }
    }
  }
}
