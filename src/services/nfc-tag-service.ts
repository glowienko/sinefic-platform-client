import { Injectable } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { TagsClient } from './../providers/tags-client/tags-client'
import { GroupListPage } from './../pages/group-list/group-list';

import { UserTagData } from './../providers/tags-client/domain/user-tag-data';

@Injectable()
export class NfcTagService {

    constructor(private storage: Storage, private alertCtrl: AlertController,
        private navCtrl: NavController, private tagsClient: TagsClient) { }

    public tagReadSuccess(tagEvent: any) {
        console.log('in tag read success, tag:');
        console.log(tagEvent.tag);

        this.tagsClient.authenticateTag(this.extractTagIdFromTagEvent(tagEvent))
            .subscribe(
            (userTagData) => {
                console.log(userTagData);
                this.saveUserTagToStorage(userTagData);
                this.showTagReadSuccessAlert();
            },
            error => this.showApiConnectionError());
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

    private showTagReadSuccessAlert() {
        let alert = this.alertCtrl.create({
            title: 'Pomyślnie odczytano tag nfc',
            subTitle: 'Witaj !',
            message: 'Naciśnij OK, aby korzystać z aplikacji',
            buttons: [
                {
                    text: 'OK',
                    handler: () => this.goToGroupsView()
                }
            ]
        });
        alert.present();
    }

    private goToGroupsView() {
        this.navCtrl.push(GroupListPage);
    }

    private showApiConnectionError() {
        let alert = this.alertCtrl.create({
            title: 'Ooops!',
            subTitle: "Błąd nawiązywania połączenia",
            message: 'Nie można pobrać danych taga z serwera.',
            buttons: ['OK']
        });
        alert.present();
    }
}