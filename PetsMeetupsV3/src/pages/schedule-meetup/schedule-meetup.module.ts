import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleMeetupPage } from './schedule-meetup';

@NgModule({
  declarations: [
    ScheduleMeetupPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleMeetupPage),
  ],
})
export class ScheduleMeetupPageModule {}
