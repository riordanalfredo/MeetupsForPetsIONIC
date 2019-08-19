import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EventPage } from '../pages/event/event';
import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Calendar } from '@ionic-native/calendar';
import { Contacts } from '@ionic-native/contacts';
import { ContactPageModule } from '../pages/contact/contact.module';
import { EventPageModule } from '../pages/event/event.module';


@NgModule({
  declarations: [
    MyApp, 
    HomePage, 
    ListPage, 
    //EventPage, 
    //ContactPage
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(MyApp),
    EventPageModule,
    ContactPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    HomePage, 
    ListPage, 
    EventPage, 
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Calendar,
    Contacts
  ]
})
export class AppModule {}
