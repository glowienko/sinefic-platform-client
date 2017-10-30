import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { NFC } from '@ionic-native/nfc';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { GroupListPage } from '../pages/group-list/group-list';
import { GroupManagementPage } from '../pages/group-management/group-management';

import { TagsClient } from './../providers/tags-client/tags-client'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GroupListPage,
    GroupManagementPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GroupListPage,
    GroupManagementPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NFC,
    Storage,
    TagsClient
  ]
})
export class AppModule {}
