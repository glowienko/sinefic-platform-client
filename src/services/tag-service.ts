import { Injectable } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage'; import { TagsApi } from './../providers/tags-api'
import { AdminPage } from './../pages/admin/admin';
import { SubscriberPage } from './../pages/subscriber/subscriber';

import { TagInfo } from './../classes/tag-info';

@Injectable()
export class TagService {

    constructor(private storage: Storage, private alertCtrl: AlertController,
        private navCtrl: NavController, private tagsApi: TagsApi) { }


    public tagReadSuccess(tagEvent: any) {
        let tag = tagEvent.tag;// tag is in json format

        console.log('in tag read success, tag:');

        console.log(tag);

        this.tagsApi.getTagInfoById(tag.id)
            .subscribe(
            (tagInfo) => {
                console.log(tagInfo);
                this.storage.ready().then(() => {

                    console.log('in tag storage ready, saving: tag-info and tag-id');
                    console.log(tagInfo);
                    console.log(tag.id);

                    this.storage.set('tag-info', tagInfo);
                    this.storage.set('tag-id', tag.id);
                });

                this.showTagReadSuccessAlert(tagInfo.isAdmin);
            },
            error => this.showApiConnectionError(error));
    }

    public failureReadTag(error) {
        let alert = this.alertCtrl.create({
            title: 'Tag read failure!',
            message: error,
            buttons: ['Ok']
        });
        alert.present();
    }

    private showTagReadSuccessAlert(isAdmin: boolean) {
        let role = isAdmin ? 'Admin' : 'Subscriber';
        let alert = this.alertCtrl.create({
            title: 'Tag read success',
            subTitle: 'Hello ' + role + ' !',
            message: 'Click OK to use application',
            buttons: [
                {
                    text: 'OK',
                    handler: () => this.changeViewDepeningOnRole(isAdmin)
                }
            ]
        });
        alert.present();
    }

    private changeViewDepeningOnRole(isAdmin: boolean) {
        if (isAdmin) {
            this.navCtrl.push(AdminPage);
        }
        else {
            this.navCtrl.push(SubscriberPage);
        }
    }

    private showApiConnectionError(error) {
        let alert = this.alertCtrl.create({
            title: 'Connection error!',
            subTitle: 'Cannot fetch tag-info from the server',
            message: error,
            buttons: ['Ok']
        });
        alert.present();
    }
}