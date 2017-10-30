import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserTagData } from './domain/user-tag-data';
import { ContentUrl } from './domain/content-url';
import { Group } from './domain/group';

@Injectable()
export class TagsClient {

  private groupsUrl: string;
  private tagUrl: string;
  private contentUrl: string;
  private headers: Headers;
  private options: RequestOptions;

  private server_url: string = 'http://localhost:9595';// TODO: should be taken from config

  constructor(public http: Http, public storage: Storage) {
    this.groupsUrl = '/api/groups';// TODO: should be taken from config
    this.tagUrl = '/api/tag';
    this.contentUrl = '/api/content/url';

    this.headers = new Headers({ 'Content-Type': 'application/json' });

    this.options = new RequestOptions({ headers: this.headers });
  }

  public getTagInfoById(tagId: Array<Number>): Observable<UserTagData> {

    console.log('in get tag info method api call');

    let infoUrl: any = this.server_url + this.tagUrl + '?' + this.getTagIdForUrl(tagId);

    return this.http.get(infoUrl, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getContentUrlByGroupName(groupName: string): Observable<ContentUrl> {
    console.log('in get conntent by group name api call');
    this.addAuthHeaderIfNoExist();
    let contetnUrl: any = this.server_url + this.contentUrl + `/${groupName}`;

    return this.http.get(contetnUrl, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public createGroup(newGroup: Group, tagId: Array<Number>): Observable<Group> {
    this.addAuthHeaderIfNoExist();
    let groupsUrl: any = this.server_url + this.groupsUrl;
    let requestBody = {
      newGroup: newGroup,
      tagId: tagId
    };
    return this.http.post(this.groupsUrl, requestBody, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getTagsForGroup(groupName: string, groupAdmin: Array<Number>) {
    this.addAuthHeaderIfNoExist();
    let groupsUrl: any = this.server_url + this.groupsUrl + `/${groupName}` + '?' + this.getTagIdForUrl(groupAdmin);

    return this.http.get(groupsUrl, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteGroup(groupName: string): Observable<Group> {
    this.addAuthHeaderIfNoExist();
    let groupsUrl: any = this.server_url + this.groupsUrl + `/${groupName}`;

    return this.http.delete(groupsUrl, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addTagToGroup(groupName: string, newTag: UserTagData): Observable<Group> {
    this.addAuthHeaderIfNoExist();
    let addTagTogroupUrl: any = this.server_url + this.tagUrl + `/${groupName}`;

    return this.http.post(addTagTogroupUrl, newTag, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteTagFromGroup(tagId: Array<Number>, groupName: string): Observable<Group> {
    this.addAuthHeaderIfNoExist();
    let deleteTagFromGroupUrl: any = this.server_url + this.tagUrl + `/${tagId}/group/${groupName}`;

    return this.http.delete(deleteTagFromGroupUrl, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //addMessage to group -- api for services :)
  //send location to group

  private addAuthHeaderIfNoExist() {
    if (!this.headers.has('Authorization')) {
      this.storage.ready().then(() => {
        this.storage.get('tag-info').then(
          (UserTagData: UserTagData) => {
            this.headers.append('Authorization', UserTagData.access_token);
            this.options = new RequestOptions({ headers: this.headers });
          });
      });
    }
  }

  private extractData(res: Response) {
    console.log('in extract data, tags api, response:');
    console.log(res.json());
    let body = res.json();
    return body || {};
  }

  private getTagIdForUrl(tagId: Array<Number>) {
    //returns: tag_id[one]=1&tag_id[two]=2&tag_id[three]=3
    return 'tag_id[one]=' + tagId[0] + '&tag_id[two]=' + tagId[1] + '&tag_id[three]=' + tagId[2];
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