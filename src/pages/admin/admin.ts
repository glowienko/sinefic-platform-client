import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GroupManagementPage } from './../../pages/group-management/group-management';
import { Group } from './../../classes/group';
import { TagsApi } from './../../providers/tags-api';
import { TagInfo } from './../../classes/tag-info';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {


  public groups: Array<Group>;
  private tagId: Array<Number>;
  public errorMessage: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private tagsApi: TagsApi, public modalCtrl: ModalController,
    private alertCtrl: AlertController) { }

  ionViewDidLoad() {
    this.getGroupsFromStorage();
    this.getTagIdFromStorage();
  }

  showGroupView(group: Group) {
    this.navCtrl.push(GroupManagementPage, { group: group, tagId: this.tagId});
  }

  showAddGroupPopup() {
    let newGroup = new Group();
    let alert = this.alertCtrl.create();
    alert.setTitle('Add new group');
    alert.setMessage('Create new group passing name and service you will be uploading to this group');
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Create',
      handler: (data) => {
        newGroup.name = data.name; //sprawdzic co jest w tym data :D
        newGroup.service = data.service;

        console.log("created new group:");
        console.log(newGroup);
        this.addGroup(newGroup);
      }
    });
    alert.addInput({
      name: 'name',
      placeholder: 'group name'
    });
    alert.addInput({
      name: 'service',
      placeholder: 'group service name'
    });

    alert.present();
  }

  private addGroup(newGroup: Group) {
    this.tagsApi.createGroup(newGroup, this.tagId)
      .subscribe(
      group => this.groups.push(group),
      error => this.errorMessage = <any>error);

  }

  private getGroupsFromStorage() {
    this.storage.ready().then(() => {
      this.storage.get('tag-info')
        .then(
        (tagInfo: TagInfo) => {
          this.groups = tagInfo.groups;
        });
    });
  }

  private getTagIdFromStorage() {
    this.storage.ready().then(() => {
      this.storage.get('tag-id')
        .then(
        (tagId: any) => {
          this.tagId = tagId;
        });
    });
  }
}