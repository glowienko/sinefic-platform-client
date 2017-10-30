import {Group} from './group';

export class UserTagData {
    id: Array<Number>
    groups: Array<Group>
    isAdmin: boolean
    access_token: string
}