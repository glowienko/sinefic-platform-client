import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Group } from './../../providers/tags-client/domain/group';
import { Content } from './../../providers/tags-client/domain/content'
import { UserTagData } from './../../providers/tags-client/domain/user-tag-data';
import { TagsClient } from './../../providers/tags-client/tags-client';

import { ScanTagIdModalPage } from './scan-tag-id-modal/scan-tag-id-modal';

@Component({
  selector: 'page-group-management',
  templateUrl: 'group-management.html',
  providers: [TagsClient]
})
export class GroupManagementPage {

  private userTagId: Array<Number>;
  public group: Group;
  public groupMembers: Array<UserTagData>;
  public groupContentUrl: String;
  public isTagGroupAdmin: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tagsClient: TagsClient, public modalCtrl: ModalController) { }

  ionViewDidLoad() {
    this.group = this.navParams.data.group;
    this.userTagId = this.navParams.data.tagId;
    this.getContentUrlForGroup(this.group);
    this.evaluateUserTagScope(this.userTagId, this.group.adminId);
  }

  public openPluginApp() {
    //TODO
  }

  public addGroupMember() {
    let scanTagIdModal = this.createTagIdScanningModal();

    scanTagIdModal.onDidDismiss(scannedTagId => {
      this.tagsClient.addTagToGroup(scannedTagId, this.group.name);
    });
  }

  public deleteGroupMember() {
    let scanTagIdModal = this.createTagIdScanningModal();

    scanTagIdModal.onDidDismiss(scannedTagId => {
      this.tagsClient.deleteTagFromGroup(scannedTagId, this.group.name);
    });
  }

  public deleteGroup() {
    this.tagsClient.deleteGroup(this.group.name);
  }

  private createTagIdScanningModal() {
    let scanTagIdModal = this.modalCtrl.create(ScanTagIdModalPage);
    scanTagIdModal.present();
    return scanTagIdModal;
  }

  private getContentUrlForGroup(group: Group) {
    this.tagsClient.getContentUrl(group.name)
      .subscribe(
          (content: Content) => this.groupContentUrl = content.url
        )
  }

  private evaluateUserTagScope(userTagId, groupAdminId)  {
    this.isTagGroupAdmin = userTagId === groupAdminId ? true : false;
  }

}

