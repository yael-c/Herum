import {Gender} from '../Enums/Gender';
import {GroupPreview} from '../Previews/GroupPreview';
import {CollectionSubscription} from './CollectionSubscription';
import {LoginData} from './LoginData';
import {UserAssignment} from './UserAssignment';

export type User = {
    _id: string;
    personalId: string;
    militaryId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    street: string;
    houseNumber: string;
    password: string;
    groups: GroupPreview[];
    logins: LoginData[];
    note: string;
    referringUser: string;
    gender: Gender;
    birthDate: Date;
    isDelete: boolean;
    profession: string;
    // rank: string;
    assignments: UserAssignment[];
    collectionsActivitiesHistory: CollectionSubscription[];
    subscribedCollections: CollectionSubscription[];
};


export type BasicUserDetails = Pick<User, 'birthDate' | 'profession' | 'rank' | 'militaryId' | 'personalId'>;
