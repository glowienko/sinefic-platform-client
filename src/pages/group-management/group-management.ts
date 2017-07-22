import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { Group } from './../../classes/group';
import { TagsApi } from './../../providers/tags-api';

@Component({
  selector: 'page-group-management',
  templateUrl: 'group-management.html',
  providers: [TagsApi]
})
export class GroupManagementPage {

  public group: Group;
  public groupMembers: Array<any>;
  private ownerId: Array<Number>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tagsApi: TagsApi) { }

  ionViewDidLoad() {
    this.group = this.navParams.data.group;
    this.ownerId = this.navParams.data.tagId;

    this.tagsApi.getTagsForGroup(this.group.name, this.ownerId).subscribe(
      (groupMembers) => {
        this.groupMembers = groupMembers;
      });
  }

  public showGroupMemeberDetails() {
    
  }


}
