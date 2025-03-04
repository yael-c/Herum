// graphql-queries.ts
import gql from 'graphql-tag';

export const GET_USER_GENERAL_DETAILS = `
    query GetUserGeneralDetails {
        getUserGeneralDetails {
            firstName
            lastName
            email
            phoneNumber
            city
            street
            houseNumber
            profession
            rank
        }
    }
`;

export const GET_USER_COLLECTIONS_SUBSCRIPTIONS = `
    query GetUserCollectionsSubscriptions {
        getUserCollectionsSubscriptions {
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
`;