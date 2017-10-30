import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Group } from './../../../providers/tags-client/domain/group';
import { ContentUrl } from './../../../providers/tags-client/domain/content-url'

@Component({
  selector: 'page-subscriber-group-selected-modal',
  templateUrl: 'subscriber-group-selected-modal.html'
})
export class SubscriberGroupSelectedModalPage {

  group: Group;
  url: ContentUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController) {

   }

  ionViewDidLoad() {
    console.log('data from nav params - should be group');
    let data = this.navParams.get('data');//check this
    console.log(data.group);
    this.group = data.group;
    this.url = data.url;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
