import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NFC } from '@ionic-native/nfc';
import { IonicStorageModule } from '@ionic/storage';
import { AdminPage } from '../pages/admin/admin';
import { SubscriberPage } from '../pages/subscriber/subscriber';
import { GroupManagementPage } from '../pages/group-management/group-management';
import { SubscriberGroupSelectedModalPage } from '../pages/subscriber-group-selected-modal/subscriber-group-selected-modal'

import { HomePage } from '../pages/home/home';
import { TagsApi } from './../providers/tags-api'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdminPage,
    SubscriberPage,
    GroupManagementPage,
    SubscriberGroupSelectedModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdminPage,
    SubscriberPage,
    GroupManagementPage,
    SubscriberGroupSelectedModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NFC,
    Storage,
    TagsApi
  ]
})
export class AppModule { }
