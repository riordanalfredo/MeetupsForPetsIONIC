import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListOfMeetupsPage } from '../pages/list-of-meetups/list-of-meetups';
import { AddPetPage } from '../pages/add-pet/add-pet';
import { EventPage } from '../pages/event/event';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MessagePage } from '../pages/message/message';
import { ImageUploadService } from '../services/image_upload_service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Calendar } from '@ionic-native/calendar';
import { SMS } from '@ionic-native/sms';
import { Contacts } from '@ionic-native/contacts';
import { Camera } from '@ionic-native/camera';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth'
import { firebaseConfig } from '../config';
import { AuthProvider } from '../providers/auth/auth';
import { DbProvider } from '../providers/db/db';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ProfilePage } from '../pages/profile/profile';
import { EditDetailsPage } from '../pages/edit-details/edit-details';
import { EditPasswordPage } from '../pages/edit-password/edit-password';

@NgModule({
  declarations: [MyApp, HomePage, ListOfMeetupsPage, EventPage, ContactPage, MessagePage, AddPetPage, LoginPage, SignupPage, ProfilePage, EditDetailsPage, EditPasswordPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), AngularFireModule.initializeApp(firebaseConfig), AngularFireDatabaseModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ListOfMeetupsPage, EventPage, ContactPage, MessagePage, AddPetPage, LoginPage, SignupPage, ProfilePage, EditDetailsPage, EditPasswordPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ImageUploadService,
    Calendar,
    Contacts,
    AngularFireAuth,
    AuthProvider,
    DbProvider,
    Camera,
    SMS,
    Contacts
  ]
})
export class AppModule { }
