import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SubscriberGroupSelectedModalPage } from '././subscriber-group-selected-modal/subscriber-group-selected-modal';

import { Group } from './../../providers/tags-client/domain/group';
import { TagsClient } from './../../providers/tags-client/tags-client';
import { UserTagData } from './../../providers/tags-client/domain/user-tag-data';
import { ContentUrl } from './../../providers/tags-client/domain/content-url';

@Component({
  selector: 'page-subscriber',
  templateUrl: 'subscriber.html',
  providers: [TagsClient]
})
export class SubscriberPage {

  public groups: Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private tagsClient: TagsClient, public modalCtrl: ModalController) { }

  ionViewDidLoad() {
    this.getGroupsFromStorage();
  }

  private getGroupsFromStorage() {
    this.storage.get('tag-info')
      .then(
      (userTagData: UserTagData) => {
        console.log('in getGroups from storage');
        console.log(userTagData.groups);
        this.groups = userTagData.groups;
      });
  }

  public getContentUrlForGroup(group: Group) {
    this.tagsClient.getContentUrlByGroupName(group.name)
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

  private openDecisionModal(dataForModaldata: any) {
    let modal = this.modalCtrl.create(SubscriberGroupSelectedModalPage, { data: dataForModaldata });
    modal.present();

  }


}