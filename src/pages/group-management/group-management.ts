import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Group } from './../../providers/tags-client/domain/group';
import { UserTagData } from './../../providers/tags-client/domain/user-tag-data';
import { TagsClient } from './../../providers/tags-client/tags-client';

import {ScanTagIdModalPage} from './scan-tag-id-modal/scan-tag-id-modal';

@Component({
  selector: 'page-group-management',
  templateUrl: 'group-management.html',
  providers: [TagsClient]
})
export class GroupManagementPage {

  private ownerId: Array<Number>;
  public group: Group;
  public groupMembers: Array<UserTagData>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tagsClient: TagsClient, public modalCtrl: ModalController) { }

  ionViewDidLoad() {
    this.group = this.navParams.data.group;
    this.ownerId = this.navParams.data.tagId;

    this.tagsClient.getTagsForGroup(this.group.name, this.ownerId).subscribe(
      (groupMembers) => {
        this.groupMembers = groupMembers;
      });
  }

  public addGroupMember() {
    let newTag = new UserTagData();

    newTag.groups.push(this.group);
    newTag.isAdmin = false;
    newTag.id = [1,1,1];
    //show popup for scanning tag ID TODO : take tag /id from the real NFC TAG

    let scanTagIdModal = this.createTagIdScanningModal();

    scanTagIdModal.onDidDismiss(scannedTagId => {
        newTag.id = scannedTagId;
        this.tagsClient.addTagToGroup(this.group.name, newTag);
    });
  }

  public deleteGroupMember(userTag: UserTagData) {
    this.tagsClient.deleteTagFromGroup(userTag.id, this.group.name);
  }

  public deleteGroup() {
    this.tagsClient.deleteGroup(this.group.name);
  }

  private createTagIdScanningModal() {
    let scanTagIdModal = this.modalCtrl.create(ScanTagIdModalPage);
    scanTagIdModal.present();
    return scanTagIdModal;
  }

}
