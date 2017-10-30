
import { Component } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';

import { NfcTagService } from './../../services/nfc-tag-service'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NfcTagService]
})
export class HomePage {

  errorMessage: any;

  constructor(private platform: Platform, private nfc: NFC, private nfcTagService: NfcTagService, private alertCtrl: AlertController) {
    
    nfc.enabled().then(
      () => {
        this.onNfcEnabled();
      },
      () => this.onNfcDisabled());

    console.log('in home controller');
  }

  public adminPage() {
    let tag = { id: [3, 2, 1] };
    let tagEvent = { 'tag': tag };
    console.log('in adminPage method');

    this.nfcTagService.tagReadSuccess(tagEvent);
  }

  public subscriberPage() {
    let tag = { id: [1, 2, 3] };
    let tagEvent = { 'tag': tag };
    console.log('subscriber page method');

    this.nfcTagService.tagReadSuccess(tagEvent);
  }

  private onNfcDisabled() {
    let alert = this.alertCtrl.create({
      title: 'Switch on NFC in your smartphone',
      buttons: ['Ok']
    });
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