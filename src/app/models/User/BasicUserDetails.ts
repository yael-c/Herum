import {User} from './User';

export type BasicUserDetails = Pick<User, 'birthDate' | 'profession' | 'militaryId' | 'personalId' | 'rank'>; // todo add: | 'rank'

const BASIC_USER_DETAILS_MAP = {
    'birthDate': 'תאריך לידה',
    'profession': 'מקצוע צבאי',
    'rank': 'דרגה',
    'militaryId': 'מספר אישי',
    'personalId': 'תעודת זהות',
} as const;

export function createDisplayFromBasicUserDetails(details: any): KeyValue[] {
    const keyValueDetails: KeyValue[] = [];
    for (const key in details) {
        keyValueDetails.push({id: key, key: BASIC_USER_DETAILS_MAP[key as keyof typeof BASIC_USER_DETAILS_MAP], value: (details as any)[key]})
    }
    return keyValueDetails;
}

export type KeyValue = {
    id: string;
    key: string;
    value: string;
};
