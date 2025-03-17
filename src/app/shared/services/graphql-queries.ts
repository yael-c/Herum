export class HomePageQueries {

    // todo: if the field 'rank' was stored in the server, i would add it here too
    public static GET_USER_BASIC_DETAILS = `
        query {
            user {
                personalId
                militaryId
                profession
                birthDate
            }
        }
    `;

    public static GET_USER_GENERAL_DETAILS = `
        query {
            user {
                phoneNumber
                email
                birthDate
            }
        }
    `;

    public static GET_USER_COLLECTIONS_SUBSCRIPTIONS = `
        query {
            user {
                subscribedCollections {
                    collectionPreview {
                        id
                        name
                        description
                        imageUrl
                        topics
                    }
                    resourceSubscriptions {
                        resourcePreview {
                            id
                            title
                            description
                            grade
                            resourceType
                        }
                        positionInCollection
                        subscriptionStatus
                        lastActivityTime
                        grade
                    }
                    subscriptionStatus
                    feedPriority
                    subscriptionTime
                    lastActivityTime
                    grade
                }
            }
        }
    `;

    public static GET_USER_PROFILE_INFO = `
        query {
            user {
                firstName
                lastName
                profession
            }
        }
    `;
}
