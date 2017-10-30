import { Injectable } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { TagsClient } from './../providers/tags-client/tags-client'
import { AdminPage } from './../pages/admin/admin';
import { SubscriberPage } from './../pages/subscriber/subscriber';

import { UserTagData } from './../providers/tags-client/domain/user-tag-data';

@Injectable()
export class NfcTagService {

    constructor(private storage: Storage, private alertCtrl: AlertController, 
        private navCtrl: NavController, private tagsClient: TagsClient) { }

    public tagReadSuccess(tagEvent: any) {
        console.log('in tag read success, tag:');
        console.log(tagEvent.tag);

        this.tagsClient.getTagInfoById(this.extractTagIdFromTagEvent(tagEvent))
            .subscribe(
            (userTagData) => {
                console.log(userTagData);
                this.saveUserTagToStorage(userTagData);
                this.showTagReadSuccessAlert(userTagData.isAdmin);
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
    

    public extractTagIdFromTagEvent(tagEvent: any) {
        return tagEvent.tag.id;
    }

    private saveUserTagToStorage(userTagData: UserTagData) {
        this.storage.ready()
            .then(() => {

                console.log('in tag storage ready, saving: user-tag-data');
                console.log(userTagData);

                this.storage.set('tag-info', userTagData);
                this.storage.set('tag-id', userTagData.id);
            });
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