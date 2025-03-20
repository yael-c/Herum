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


export class LibraryQueries {
    // Query to get the current user with their subscribed collections
    public static GET_CURRENT_USER = `
      query GetCurrentUser {
        user {
          id
          firstName
          lastName
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
                resourceType
              }
            }
            subscriptionStatus
            lastActivityTime
          }
        }
      }
    `;

    // Query to get all collections
    // todo add imageUrl in the missing line - does not exist in the server
    public static GET_ALL_COLLECTIONS = `
      query GetAllCollections {
        collections {
          id
          name
          description
          creatingUser {
            id
            firstName
            lastName
          }
          
          topics
          resources {
            id
            title
            description
            resourceType
          }
          isPublic
          lastUpdateTime
          creationTime
          certificateLevel
        }
      }
    `;

    // Query to get collections by topic
    public static GET_COLLECTIONS_BY_TOPIC = `
      query GetCollectionsByTopic($topic: String) {
        collections(where: { topics_contains: $topic }) {
          Id
          Name
          Description
          ImageUrl
          Topics
          Resources {
            Id
            Title
            Description
            ResourceType
          }
          IsPublic
          LastUpdateTime
          CreationTime
          CertificateLevel
        }
      }
    `;

    // Query to get a single collection by ID
    public static GET_COLLECTION_BY_ID = `
      query GetCollectionById($id: ID!) {
        collections(where: { id: { eq: $id } }) {
          Id
          Name
          Description
          ImageUrl
          Topics
          Resources {
            Id
            Title
            Description
            ResourceType
          }
          IsPublic
          CreatingUser {
            Id
            FirstName
            LastName
          }
          LastUpdateTime
          CreationTime
          CertificateLevel
        }
      }
    `;
}