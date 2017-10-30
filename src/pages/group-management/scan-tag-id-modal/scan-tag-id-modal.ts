import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';
import { NfcTagService } from './../../../services/nfc-tag-service'

@IonicPage()
@Component({
  selector: 'page-scan-tag-id-modal',
  templateUrl: 'scan-tag-id-modal.html',
})
export class ScanTagIdModalPage {


  scannedTagId: Array<Number>

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public nfc: NFC,
    private alertCtrl: AlertController,
    public nfcTagService: NfcTagService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanTagIdModalPage');

    this.nfc.enabled().then(
      () => {
        this.onNfcEnabled();
      },
      () => this.onNfcDisabled());


  }

  dismiss() {
    this.viewCtrl.dismiss(this.scannedTagId);
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
      (tagEvent) => this.tagReadSuccess(
        this.nfcTagService.extractTagIdFromTagEvent(tagEvent)
      ),

      (error) => this.nfcTagService.failureReadTag(error)
      );

    this.nfc.addTagDiscoveredListener(this.nfcTagService.tagReadSuccess, this.nfcTagService.failureReadTag)
      .subscribe(
      (tagEvent) => this.tagReadSuccess(
        this.nfcTagService.extractTagIdFromTagEvent(tagEvent)
      ),
      (error) => this.nfcTagService.failureReadTag(error));
  }

  private tagReadSuccess(tagId: Array<Number>) {
    this.scannedTagId = tagId;
    this.dismiss();
  }

}
