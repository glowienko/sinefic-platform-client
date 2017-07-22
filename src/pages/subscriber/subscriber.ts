import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {SubscriberGroupSelectedModalPage} from '././../subscriber-group-selected-modal/subscriber-group-selected-modal';
import { Group } from './../../classes/group';
import { TagsApi } from './../../providers/tags-api';
import {TagInfo} from './../../classes/tag-info';
import {ContentUrl} from './../../classes/content-url';

@Component({
  selector: 'page-subscriber',
  templateUrl: 'subscriber.html',
  providers: [TagsApi]
})
export class SubscriberPage {

  public groups: Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage, private tagsApi: TagsApi,public modalCtrl: ModalController) { }

  ionViewDidLoad() {
    this.getGroupsFromStorage();
  }

  private getGroupsFromStorage() {
    this.storage.get('tag-info')
      .then(
        (tagInfo: any) =>  {
          console.log('in getGroups from storage');
          console.log(tagInfo.groups);
          this.groups = tagInfo.groups;
        });
  }

  getContentUrlForGroup(group: Group) {
    this.tagsApi.getContentUrlByGroupName(group.name)
      .subscribe(
        (contentUrl: ContentUrl) => {
          let dataForModal = {
            url: contentUrl.url,
            group: group
          }; 
          this.openDecisionModal(dataForModal);
        }
      )
  }

  openDecisionModal(dataForModaldata :any) {
    let modal = this.modalCtrl.create(SubscriberGroupSelectedModalPage, {data: dataForModaldata});
    modal.present();

  }


}