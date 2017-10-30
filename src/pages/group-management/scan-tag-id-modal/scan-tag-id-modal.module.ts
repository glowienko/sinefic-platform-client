import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanTagIdModalPage } from './scan-tag-id-modal';

@NgModule({
  declarations: [
    ScanTagIdModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanTagIdModalPage),
  ],
})
export class ScanTagIdModalPageModule {}
