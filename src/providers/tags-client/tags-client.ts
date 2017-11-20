import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserTagData } from './domain/user-tag-data';
import { Content } from './domain/content';
import { Group } from './domain/group';

@Injectable()
export class TagsClient {

  private headers: Headers;
  private options: RequestOptions;

  private server_url: string = 'http://localhost:9595';
  private auth_request_path: string = '/auth';
  private groups_path = '/groups';
  private content_path: string = '/content';
  private plugins_path: string = '/plugins';
  private members_path: string = '/members';

  constructor(public http: Http, public storage: Storage) {

    this.headers = new Headers({ 'Content-Type': 'application/json' });

    this.options = new RequestOptions({ headers: this.headers });
  }

  public authenticateTag(tagId: Array<Number>): Observable<UserTagData> {
    let authUrl: any = this.server_url + this.auth_request_path;

    return this.http.post(authUrl, { tagId: tagId }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public createGroup(newGroup: Group): Observable<Group> {
    this.addAuthHeaderIfNotExist();
    let groupsUrl: any = this.server_url + this.groups_path;

    console.log("________________________");
    console.log(this.headers);
    return this.http.post(groupsUrl, newGroup)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getAvailablePlugins(): Observable<Array<String>> {
    this.addAuthHeaderIfNotExist();
    let pluginsUrl: any = this.server_url + this.plugins_path;

    return this.http.get(pluginsUrl, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getContentUrl(groupName: string): Observable<Content> {
    this.addAuthHeaderIfNotExist();

    let contetnUrl: any = this.server_url + this.groups_path + `/${groupName}` + this.content_path;

    return this.http.get(contetnUrl, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteGroup(groupName: string): Observable<Group> {
    this.addAuthHeaderIfNotExist();
    let groupsUrl: any = this.server_url + this.groups_path + `/${groupName}`;

    console.log(groupsUrl);
    console.log(this.options);
    
    return this.http.delete(groupsUrl, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addTagToGroup(newTagId: Array<Number>, groupName: string) {
    this.addAuthHeaderIfNotExist();
    let addTagTogroupUrl: any = this.server_url + `/${groupName}` + this.members_path;

    return this.http.post(addTagTogroupUrl, { newTagId: newTagId }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteTagFromGroup(tagId: Array<Number>, groupName: string) {
    this.addAuthHeaderIfNotExist();
    let deleteTagFromGroupUrl: any = this.server_url + this.groups_path + `/${groupName}` + this.members_path + `/${tagId}`;

    return this.http.delete(deleteTagFromGroupUrl, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private addAuthHeaderIfNotExist() {
    if (!this.headers.has('Authorization')) {
      this.storage.ready().then(() => {
        this.storage.get('tag-info').then(
          (UserTagData: UserTagData) => {
            this.headers.append('Authorization', UserTagData.token);
            this.options = new RequestOptions({ headers: this.headers });
          });
      });
    }
  }

  private extractData(res: Response) {
    console.log('in  extractData method, tags api class , response:');
    console.log(res.json());
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}