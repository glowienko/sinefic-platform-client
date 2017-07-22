
import { Component } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';

import { TagService } from './../../services/tag-service'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TagService]
})
export class HomePage {

  errorMessage: any;

  constructor(private platform: Platform, private nfc: NFC, private tagService: TagService, private alertCtrl: AlertController) {

    nfc.enabled().then(
      (info) => this.onNfcEnabled(info),
      (reason) => this.onNfcDisabled(reason));

    console.log('in home controller');
    platform.ready().then(
      () => this.addTagListeners());
  }

  private addTagListeners() {
    console.log('add tag listeners');
    this.nfc.addNdefListener(this.tagService.tagReadSuccess, this.tagService.failureReadTag)
      .subscribe(
      (tagEvent) => this.tagService.tagReadSuccess(tagEvent),
      (error) => this.tagService.failureReadTag(error)
      );

    this.nfc.addTagDiscoveredListener(this.tagService.tagReadSuccess, this.tagService.failureReadTag)
      .subscribe(
      (tagEvent) => this.tagService.tagReadSuccess(tagEvent),
      (error) => this.tagService.failureReadTag(error));
  }

  private onNfcDisabled(reason) {
    let alert = this.alertCtrl.create({
      title: 'Switch on NFC in your smartphone',
      buttons: ['Ok']
    });
    alert.present();
  }

  private onNfcEnabled(info) { }

  adminPage() {  //need simple server api with one endpoint :)
    let tag = { id: [3, 2, 1] };
    let tagEvent = { 'tag': tag };
    console.log('in adminPage method');

    this.tagService.tagReadSuccess(tagEvent);
  }

  subscriberPage() { //need simple server api with one endpoint :)
    let tag = { id: [1, 2, 3] };
    let tagEvent = { 'tag': tag };
    console.log('subscriber page method');

    this.tagService.tagReadSuccess(tagEvent);
  }

}
