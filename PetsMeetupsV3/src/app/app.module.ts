import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddPetPage } from '../pages/add-pet/add-pet';
import { EventPage } from '../pages/event/event';
import { ContactPage } from '../pages/contact/contact';
import { ImageUploadService } from '../services/image_upload_service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Calendar } from '@ionic-native/calendar';
import { Contacts } from '@ionic-native/contacts';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [MyApp, HomePage, ListPage, EventPage, AddPetPage, ContactPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ListPage, EventPage, AddPetPage, ContactPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ImageUploadService,
    Calendar,
    Camera,
    Contacts
  ]
})
export class AppModule {}
