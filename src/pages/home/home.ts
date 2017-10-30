
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';

import { NfcTagService } from './../../services/nfc-tag-service'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NfcTagService]
})
export class HomePage {
  constructor(private nfc: NFC, private nfcTagService: NfcTagService, private alertCtrl: AlertController) {
    nfc.enabled().then(
      () => this.onNfcEnabled(),
      () => this.onNfcDisabled()
    );
  }

  public groupsPage() {
    let tag = { id: [1, 1, 1] };
    let tagEvent = { 'tag': tag };
    this.nfcTagService.tagReadSuccess(tagEvent);
  }

  private onNfcDisabled() {
    let alert = this.alertCtrl.create({
      title: 'Potrzebujesz włączonego NFC !', 
      buttons: ['Ok']});
    alert.present();
  }

  private onNfcEnabled() {
    //need to this.nfc.beginSession, but there is no such function
    this.addTagListeners();
  }

  private addTagListeners() {
    console.log('adding tag listeners');
    this.nfc.addNdefListener(this.nfcTagService.tagReadSuccess, this.nfcTagService.failureReadTag)
      .subscribe(
      (tagEvent) => this.nfcTagService.tagReadSuccess(tagEvent),
      (error) => this.nfcTagService.failureReadTag(error)
      );

    this.nfc.addTagDiscoveredListener(this.nfcTagService.tagReadSuccess, this.nfcTagService.failureReadTag)
      .subscribe(
      (tagEvent) => this.nfcTagService.tagReadSuccess(tagEvent),
      (error) => this.nfcTagService.failureReadTag(error));
  }
}