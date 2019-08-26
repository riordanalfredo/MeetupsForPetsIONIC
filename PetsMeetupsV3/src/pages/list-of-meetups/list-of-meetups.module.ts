import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOfMeetupsPage } from './list-of-meetups';

@NgModule({
  declarations: [
    ListOfMeetupsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOfMeetupsPage),
  ],
})
export class ListOfMeetupsPageModule {}
