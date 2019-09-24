import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';

import { firebaseConfig } from '../config';
import { AuthProvider } from '../app/providers/auth/auth';
import { DbProvider } from '../app/providers/db/db';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AddPetPage } from './add-pet/add-pet.page';
import { AddPetPageModule } from './add-pet/add-pet.module';
import { ImageCaptureProvider } from './providers/image-capture/image-capture';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AddPetPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    AddPetPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireAuth,
    DbProvider,
    AuthProvider,
    ImageCaptureProvider,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
