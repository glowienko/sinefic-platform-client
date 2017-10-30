import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GroupManagementPage } from './../../pages/group-management/group-management';

import { Group } from './../../providers/tags-client/domain/group';
import { UserTagData } from './../../providers/tags-client/domain/user-tag-data';
import { Content } from './../../providers/tags-client/domain/content';
import { TagsClient } from './../../providers/tags-client/tags-client';

@IonicPage()
@Component({
  selector: 'page-group-list',
  templateUrl: 'group-list.html',
})
export class GroupListPage {

  public userTag: UserTagData;
  public errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private tagsClient: TagsClient, public modalCtrl: ModalController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getUserTagData();
  }

  public manageGroup(group: Group) {
    this.navCtrl.push(GroupManagementPage, { group: group, tagId: this.userTag.id });
  }

  public showAddGroupPopup() {
    let newGroup = new Group();
    let alert = this.alertCtrl.create();

    alert.setTitle('Dodaj grupę');
    alert.setMessage('Stwórz grupę podając jej nazwę i usugę jaka będzie jej przypisana');
    alert.addButton('Cofnij');
    alert.addButton({
      text: 'Ok',
      handler: (data) => {
        newGroup.name = data.nazwa; //sprawdzic co jest w tym data :D
        newGroup.pluginName = data.plugin;

        console.log("created new group:");
        console.log(newGroup);
        this.addGroup(newGroup);
      }
    });
    alert.addInput({
      name: 'nazwa',
      placeholder: 'grupa abc'
    });
    alert.addInput({
      name: 'plugin',
      placeholder: 'geolocalization / messaging'
    });

    alert.present();
  }

  private addGroup(newGroup: Group) {
    newGroup.adminId = this.userTag.id;

    this.tagsClient.createGroup(newGroup)
      .subscribe(
      createdGroup => this.userTag.groups.push(createdGroup),
      error => this.errorMessage = <any>error
    );
  }

  private getUserTagData() {
    this.storage.ready().then(
      () => this.fetchTagInfoFromStorage()
    );
  }

  private fetchTagInfoFromStorage() {
    this.storage.get('tag-info').then(
      (userTagData: UserTagData) => {
      this.userTag = userTagData;
      }
    );
  }
}
