import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourPetsPage } from './your-pets';

@NgModule({
  declarations: [
    YourPetsPage,
  ],
  imports: [
    IonicPageModule.forChild(YourPetsPage),
  ],
})
export class YourPetsPageModule {}
