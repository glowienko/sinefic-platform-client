
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { ScanTagIdModalPage } from './../group-management/scan-tag-id-modal/scan-tag-id-modal';
import { NfcTagService } from './../../services/nfc-tag-service'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NfcTagService]
})
export class HomePage {
  constructor(private modalCtrl: ModalController, private nfcTagService: NfcTagService,
  ) {
    let scanTagIdModal = this.modalCtrl.create(ScanTagIdModalPage);
    scanTagIdModal.present();

    scanTagIdModal.onDidDismiss(scannedTagId => {
      this.nfcTagService.tagReadSuccess({
        tag: {
          tagId: scannedTagId
        }
      });
    });
  }
}