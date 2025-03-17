import {User} from './User';

export type UserPersonalGeneralDetails = Pick<User, 'birthDate' | 'email' | 'phoneNumber'>;


export type UserPersonalGeneralDetailsResponse = {
    data: {
        user: {
            userPersonalGeneralDetails: UserPersonalGeneralDetails
        }
    }
}


export function createDisplayFromUserDetails(details: any): { iconPath: string; label: string }[] {
    return [
        {
            iconPath: '',
            label: details?.phoneNumber
        },
        {
            iconPath: '',
            label: details?.email
        },
        {
            iconPath: '',
            label: new Date(details?.birthDate).toLocaleDateString('en-GB').toString()
        }
    ];
}