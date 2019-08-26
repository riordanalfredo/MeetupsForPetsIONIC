import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPetsPage } from './find-pets';

@NgModule({
  declarations: [
    FindPetsPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPetsPage),
  ],
})
export class FindPetsPageModule {}
