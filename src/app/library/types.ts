export interface User {
    id: string;
    personalId: string;
    sessionId?: string;
    militaryId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    street: string;
    houseNumber: string;
    password: string;
    logins: LoginData[];
    note: string;
    referringUser: string;
    gender: string;
    birthDate: Date;
    isDeleted: boolean;
    profession: string;
    rank: string;
    assignments: UserAssignment[];
    collectionActivitiesHistory: CollectionSubscription[];
    subscribedCollections: CollectionSubscription[];
}

export interface UserData {
    user: User
}

export interface UserAssignment {
    structPreview: StructPreview;
    assignmentMetadata: AssignmentMetadata;
}

export interface StructPreview {
    id: string;
}

export interface AssignmentMetadata {
    name: string;
    description: string;
    profession: string;
    assigningUserName: string;
}

export interface CollectionSubscription {
    collectionPreview: CollectionPreview;
    resourceSubscriptions: ResourceSubscription[];
    subscriptionStatus: number;
    feedPriority: number;
    subscriptionTime: Date;
    lastActivityTime: Date;
    grade: number;
}

export interface CollectionPreview {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    topics: string[];
}

export interface ResourceSubscription {
    resourcePreview: ResourcePreview;
    positionInCollection: number;
    subscriptionStatus: string;
    lastActivityTime: Date;
    grade: number;
}

export interface ResourcePreview {
    id: string;
    title: string;
    description: string;
    grade: number;
    resourceType: string;
}

export interface Collection {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    creatingUser?: UserPreview;
    resources: ResourcePreview[];
    isPublic: boolean;
    lastUpdateTime: Date;
    creationTime: Date;
    certificateLevel: string;
    isDeleted: boolean;
    topics: string[];
}

export interface UserPreview {
    id: string;
    firstName: string;
    lastName: string;
}
export type LoginData = any;
// export interface LoginData {
//     loginTime: Date;
//     IPAddress: string;
//     deviceInfo: string;
// }